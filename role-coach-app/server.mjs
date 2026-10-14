// Turo Role Coach: Accenture Innovation Hub demo server
// Zero dependencies. Node 18+.   Run:  node server.mjs   →  http://localhost:3000
//
// - Serves the UI (public/)
// - Serves catalogue + role configs (content/ locally, or CONTENT_BASE_URL e.g. Azure Blob)
// - Mints LiveAvatar session tokens server-side (API key never reaches the browser)

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./lib/env.mjs";
import { loadRole } from "./lib/role.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(ROOT, ".env"));

const PORT = Number(process.env.PORT || 3000);
const LA_API = process.env.LIVEAVATAR_API_URL || "https://api.liveavatar.com";
const MOCK = process.env.MOCK_MODE === "1";
const CONTENT_BASE_URL = (process.env.CONTENT_BASE_URL || "").replace(/\/$/, "");
const CONTENT_DIR = path.join(ROOT, "content");
const PUBLIC_DIR = path.join(ROOT, "public");

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
const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".webp": "image/webp" };
const json = (res, code, body) => { res.writeHead(code, { "Content-Type": "application/json", "Cache-Control": "no-store" }); res.end(JSON.stringify(body)); };
const readBody = (req) => new Promise((ok, bad) => { let d = ""; req.on("data", (c) => (d += c)); req.on("end", () => { try { ok(d ? JSON.parse(d) : {}); } catch (e) { bad(e); } }); });
const slug = (s) => /^[a-z0-9-]+$/.test(s || "");

async function laFetch(p, init = {}) {
  const r = await fetch(`${LA_API}${p}`, { ...init, headers: { "X-API-KEY": process.env.LIVEAVATAR_API_KEY, "Content-Type": "application/json", ...(init.headers || {}) } });
  const text = await r.text();
  let body; try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!r.ok || (body.code && body.code !== 100 && body.code !== 1000)) {
    const err = new Error(`LiveAvatar ${p} → ${r.status}: ${JSON.stringify(body).slice(0, 600)}`); err.status = 502; throw err;
  }
  return body;
}

// ---------- API ----------
async function api(req, res, url) {
  // Health / config check
  if (url.pathname === "/api/health") {
    const need = ["LIVEAVATAR_API_KEY", "ELEVENLABS_AGENT_ID", "ELEVENLABS_SECRET_ID", "LIVEAVATAR_AVATAR_ID"];
    return json(res, 200, { ok: true, mock: MOCK, missing: need.filter((k) => !process.env[k]), content: CONTENT_BASE_URL || "local" });
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

  // Start a session → mint LiveAvatar token (LITE mode + ElevenLabs agent)
  if (url.pathname === "/api/session" && req.method === "POST") {
    const { industry, role } = await readBody(req);
    if (!slug(industry) || !slug(role)) return json(res, 400, { error: "Bad role" });
    const r = await loadRole(readText, industry, role);

    if (MOCK) return json(res, 200, { mock: true, role: r.publicRole, contextual_updates: r.contextualUpdates.length });

    const avatarId = r.avatarId || process.env.LIVEAVATAR_AVATAR_ID;
    const agentId = r.config.persona.elevenlabs_agent_id || process.env.ELEVENLABS_AGENT_ID;
    const missing = [["LIVEAVATAR_API_KEY", process.env.LIVEAVATAR_API_KEY], ["ELEVENLABS_SECRET_ID", process.env.ELEVENLABS_SECRET_ID], ["avatar id", avatarId], ["agent id", agentId]].filter(([, v]) => !v).map(([k]) => k);
    if (missing.length) return json(res, 500, { error: `Server not configured. Missing: ${missing.join(", ")}. See README.` });

    const elevenlabs_agent_config = { secret_id: process.env.ELEVENLABS_SECRET_ID, agent_id: agentId, dynamic_variables: r.dynamicVariables };
    if (r.voiceId) elevenlabs_agent_config.voice_id = r.voiceId;

    const body = {
      mode: "LITE",
      avatar_id: avatarId,
      is_sandbox: process.env.LIVEAVATAR_SANDBOX === "1",
      video_settings: { quality: process.env.VIDEO_QUALITY || "high", encoding: "H264" },
      elevenlabs_agent_config,
    };
    if (process.env.MAX_SESSION_SECONDS) body.max_session_duration = Number(process.env.MAX_SESSION_SECONDS);

    const out = await laFetch("/v1/sessions/token", { method: "POST", body: JSON.stringify(body) });
    console.log(`[session] ${industry}/${role} → ${out.data?.session_id}`);
    return json(res, 200, {
      session_token: out.data.session_token,
      session_id: out.data.session_id,
      role: r.publicRole,
      contextual_updates: r.contextualUpdates,
    });
  }

  return json(res, 404, { error: "Not found" });
}

// ---------- static ----------
async function serveStatic(res, url) {
  let p = decodeURIComponent(url.pathname);
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
    return await serveStatic(res, url);
  } catch (e) {
    console.error(e.message);
    json(res, e.status || 500, { error: e.message });
  }
}).listen(PORT, () => {
  console.log(`\n  Role Coach running → http://localhost:${PORT}${MOCK ? "   (MOCK MODE: no avatar/voice)" : ""}`);
  const need = ["LIVEAVATAR_API_KEY", "ELEVENLABS_AGENT_ID", "ELEVENLABS_SECRET_ID", "LIVEAVATAR_AVATAR_ID"].filter((k) => !process.env[k]);
  if (need.length && !MOCK) console.log(`  ⚠ Missing in .env: ${need.join(", ")} (see README)\n`);
});
