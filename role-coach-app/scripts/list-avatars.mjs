// List LiveAvatar avatars (yours + public) so you can pick one for the coach.
//
//   node scripts/list-avatars.mjs            → list
//   node scripts/list-avatars.mjs <avatarId> → save as LIVEAVATAR_AVATAR_ID in .env
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, setEnvValue } from "../lib/env.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENV = path.join(ROOT, ".env");
loadEnv(ENV);

if (process.argv[2]) {
  setEnvValue(ENV, "LIVEAVATAR_AVATAR_ID", process.argv[2]);
  console.log(`Saved LIVEAVATAR_AVATAR_ID=${process.argv[2]} to .env`);
  process.exit(0);
}

const headers = { "X-API-KEY": process.env.LIVEAVATAR_API_KEY };
for (const [label, p] of [["YOUR AVATARS", "/v1/avatars"], ["PUBLIC AVATARS", "/v1/avatars/public"]]) {
  const r = await fetch(`https://api.liveavatar.com${p}?page_size=100`, { headers });
  const body = await r.json().catch(() => ({}));
  console.log(`\n=== ${label} (${body.data?.count ?? "?"}) ===`);
  if (!r.ok) { console.log("  error", r.status, JSON.stringify(body).slice(0, 300)); continue; }
  for (const a of body.data?.results || []) console.log(`  ${a.id}  ${a.name}${a.preview_url ? "  " + a.preview_url : ""}`);
}
console.log("\nPick one, then: node scripts/list-avatars.mjs <avatarId>");
