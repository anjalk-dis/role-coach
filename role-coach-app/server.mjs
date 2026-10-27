// Turo Role Coach: Disprz demo server (Spatius avatar + ElevenLabs agent)
// Zero dependencies. Node 18+.   Run:  node server.mjs   →  http://localhost:3000
//
// - Serves the UI (public/ + the shared runtime in standalone/spatius.js)
// - Serves catalogue + role configs (content/ locally, or CONTENT_BASE_URL e.g. Azure Blob)
// - The Spatius values live in public/coach-config.js (browser side); the browser fetches its own Spatius session token

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./lib/env.mjs";
import { loadRole } from "./lib/role.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || 3000);
const PREVIEW = process.env.MOCK_MODE === "1";
const CONTENT_BASE_URL = (process.env.CONTENT_BASE_URL || "").replace(/\/$/, "");
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");
const REQUIRED = ["ELEVENLABS_AGENT_ID"];

// ---------- content reader: local folder or blob URL ----------
async function readText(rel) {
  if (rel.includes("..")) throw new Error("Bad path");
  if (CONTENT_BASE_URL) {
    const sas = process.env.CONTENT_SAS ? `?${process.env.CONTENT_SAS.replace(/^\?/, "")}` : "";
    const r = await fetch(`${CONTENT_BASE_URL}/${rel}${sas}`, { cache: "no-store" });
    if (!r.ok) throw Object.assign(new Error(`Not found: ${rel}`), { status: 404 });
    return r.text();
  }
  return readFile(path.join(CONTENT_DIR, rel), "utf8").catch(() => {
    throw Object.assign(new Error(`Not found: ${rel}`), { status: 404 });
  });
}

// ---------- helpers ----------
const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".webp": "image/webp", ".wasm": "application/wasm" };
const json = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); };
const readBody = (req) => new Promise((ok, bad) => { let d = ""; req.on("data", (c) => (d += c)); req.on("end", () => { try { ok(d ? JSON.parse(d) : {}); } catch (e) { bad(e); } }); });
const slug = (s) => /^[a-z0-9-]+$/.test(s || "");

// app.js + the shared Spatius/ElevenLabs runtime, served as one module (same code the single-file build uses)
async function bundle() {
  const app = (await readFile(path.join(PUBLIC_DIR, "app.js"), "utf8")).trimEnd();
  const runtime = await readFile(path.join(ROOT, "standalone", "spatius.js"), "utf8");
  if (!app.endsWith("route();")) throw new Error("public/app.js must end with route();");
  return app.slice(0, -"route();".length) + "\n" + runtime + "\nroute();\n";
}

// ---------- API ----------
async function api(req, res, url) {
  if (url.pathname === "/api/health") {
    return json(res, 200, { ok: true, preview: PREVIEW, missing: REQUIRED.filter((k) => !process.env[k]), content: CONTENT_BASE_URL || "local" });
  }

  // Public runtime config (no Spatius values: those come from public/coach-config.js)
  if (url.pathname === "/api/config") {
    return json(res, 200, {
      elevenlabsAgentId: process.env.ELEVENLABS_AGENT_ID || "",
      agentSampleRate: Number(process.env.AGENT_SAMPLE_RATE || 16000),
      previewMode: PREVIEW,
    });
  }

  // Catalogue (marks roles that actually have a config as available)
  if (url.pathname === "/api/catalogue") {
    const cat = JSON.parse(await readText("catalogue.json"));
    for (const ind of cat.industries) {
      for (const role of ind.roles || []) {
        role.available = await readText(`roles/${ind.id}/${role.id}/config.json`).then(() => true, () => false);
      }
      ind.available = (ind.roles || []).some((r) => r.available);
    }
    return json(res, 200, cat);
  }

  // Public role info for the coach screen
  let m = url.pathname.match(/^\/api\/roles\/([^/]+)\/([^/]+)$/);
  if (m && slug(m[1]) && slug(m[2])) {
    const { publicRole } = await loadRole(readText, m[1], m[2]);
    return json(res, 200, publicRole);
  }

  // Role variables + context updates for the ElevenLabs agent
  if (url.pathname === "/api/session" && req.method === "POST") {
    const { industry, role } = await readBody(req);
    if (!slug(industry) || !slug(role)) return json(res, 400, { error: "Bad role" });
    const r = await loadRole(readText, industry, role);
    console.log(`[session] ${industry}/${role}`);
    return json(res, 200, { role: r.publicRole, dynamic_variables: r.dynamicVariables, contextual_updates: r.contextualUpdates });
  }

  return json(res, 404, { error: "Not found" });
}

// ---------- static ----------
async function serveStatic(req, res, url) {
  let p = decodeURIComponent(url.pathname);
  if (p === "/bundle.js") {
    res.writeHead(200, { "Content-Type": "text/javascript", "Cache-Control": "no-cache" });
    return res.end(await bundle());
  }
  if (p === "/coach-config.js" && !(await stat(path.join(PUBLIC_DIR, "coach-config.js")).then(() => true, () => false))) {
    // Deployed (Cloud Run): the Spatius config is a mounted secret file, e.g. COACH_CONFIG_FILE=/secrets/coach-config.js
    if (process.env.COACH_CONFIG_FILE) {
      const body = await readFile(process.env.COACH_CONFIG_FILE, "utf8").catch(() => null);
      if (body) { res.writeHead(200, { "Content-Type": "text/javascript", "Cache-Control": "no-cache" }); return res.end(body); }
    }
    res.writeHead(200, { "Content-Type": "text/javascript", "Cache-Control": "no-cache" });
    return res.end("window.COACH_CONFIG = {}; console.warn('coach-config.js not found: copy public/coach-config.example.js to public/coach-config.js');");
  }
  if (p === "/" || !path.extname(p)) p = "/index.html"; // SPA fallback
  const file = path.join(PUBLIC_DIR, path.normalize(p));
  if (!file.startsWith(PUBLIC_DIR)) return json(res, 403, { error: "Forbidden" });
  try {
    await stat(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(await readFile(file));
  } catch { json(res, 404, { error: "Not found" }); }
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname.startsWith("/api/")) return await api(req, res, url);
    return await serveStatic(req, res, url);
  } catch (e) {
    console.error(e.message);
    json(res, e.status || 500, { error: e.message });
  }
}).listen(PORT, () => {
  console.log(`\n  Role Coach running → http://localhost:${PORT}${PREVIEW ? "   (PREVIEW MODE: no avatar/voice)" : ""}`);
  const need = REQUIRED.filter((k) => !process.env[k]);
  if (need.length && !PREVIEW) console.log(`  ⚠ Missing in .env: ${need.join(", ")} (see README)\n`);
});
