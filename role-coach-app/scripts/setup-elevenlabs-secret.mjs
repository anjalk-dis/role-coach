// One-time: register your ElevenLabs API key with LiveAvatar and save the secret id to .env
//
//   node scripts/setup-elevenlabs-secret.mjs <ELEVENLABS_API_KEY>
//
// The ElevenLabs key needs permissions: convai_read, user_read, voices_read (paid tier, not free).
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv, setEnvValue } from "../lib/env.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENV = path.join(ROOT, ".env");
loadEnv(ENV);

const elKey = process.argv[2] || process.env.ELEVENLABS_API_KEY;
if (!elKey) { console.error("Usage: node scripts/setup-elevenlabs-secret.mjs <ELEVENLABS_API_KEY>"); process.exit(1); }
if (!process.env.LIVEAVATAR_API_KEY) { console.error("LIVEAVATAR_API_KEY missing in .env"); process.exit(1); }

const r = await fetch("https://api.liveavatar.com/v1/secrets", {
  method: "POST",
  headers: { "X-API-KEY": process.env.LIVEAVATAR_API_KEY, "Content-Type": "application/json" },
  body: JSON.stringify({ secret_type: "ELEVENLABS_API_KEY", secret_value: elKey, secret_name: "turo-role-coach-elevenlabs" }),
});
const body = await r.json().catch(() => ({}));
if (!r.ok || !body.data?.id) { console.error("Failed:", r.status, JSON.stringify(body)); process.exit(1); }

setEnvValue(ENV, "ELEVENLABS_SECRET_ID", body.data.id);
console.log(`Saved ELEVENLABS_SECRET_ID=${body.data.id} to .env`);
