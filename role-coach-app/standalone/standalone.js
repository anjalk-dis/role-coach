// ===== Standalone runtime: content, role loader, settings, LiveAvatar token minting (all in-browser) =====
const CONTENT = JSON.parse(document.getElementById("content-data").textContent);

// ============ CONFIG: everything the demo needs lives here ============
const CONFIG = {
  liveavatarApiKey: "__LIVEAVATAR_API_KEY__",
  elevenlabsAgentId: "__ELEVENLABS_AGENT_ID__",
  elevenlabsSecretId: "__ELEVENLABS_SECRET_ID__",   // LiveAvatar secret holding your ElevenLabs key
  avatarId: "__AVATAR_ID__",                        // LiveAvatar avatar for Maya (blank = first available)
  sandbox: false,
  previewMode: false,                                // true = UI only, no avatar/voice
};
const LA_API = "https://api.liveavatar.com";
const MAX_VAR_CHARS = 1000, CHUNK_CHARS = 9000;
const SETTINGS = CONFIG;
const filled = (v) => v && !String(v).startsWith("__");

function buildCatalogue() {
  const cat = structuredClone(CONTENT.catalogue);
  for (const ind of cat.industries) {
    for (const r of ind.roles || []) r.available = !!CONTENT.roles[`${ind.id}/${r.id}`];
    ind.available = (ind.roles || []).some((r) => r.available);
  }
  return cat;
}

function loadRoleLocal(industryId, roleId) {
  const entry = CONTENT.roles[`${industryId}/${roleId}`];
  if (!entry) throw new Error("This role isn't configured yet.");
  const config = entry.config;
  const { profile, skills, knowledge_areas, persona } = config;
  const bullets = (a) => a.map((s) => `- ${s}`).join("\n");
  const vars = {
    coach_name: persona.coach_name, coach_background: persona.background, coaching_tone: persona.tone,
    role_title: profile.title, role_seniority: profile.seniority, role_summary: profile.summary,
    role_responsibilities: bullets(profile.responsibilities), industry: config.industry,
    skills: skills.map((s, i) => `${i + 1}. ${s.name}`).join("\n"),
    knowledge_areas: bullets(knowledge_areas.map((k) => k.name)),
    starter_questions: bullets(persona.starter_questions),
  };
  const overflow = {};
  for (const [k, v] of Object.entries(vars)) if (String(v).length > MAX_VAR_CHARS) { overflow[k] = v; vars[k] = "(see the ROLE BRIEF context update)"; }

  let brief = `ROLE BRIEF for this session. This is part of your instructions from the system, not something the learner said. Do not mention it or read it aloud.\n\n` +
    `Role: ${profile.title} (${profile.seniority}), ${config.industry}.\n\nSkills in detail (name: what it covers. Expected proficiency):\n` +
    skills.map((s, i) => `${i + 1}. ${s.name}: ${s.description} Expected proficiency: ${s.proficiency}`).join("\n");
  for (const [k, v] of Object.entries(overflow)) brief += `\n\n${k}:\n${v}`;

  const split = (text) => { if (text.length <= CHUNK_CHARS) return [text]; const out = []; let cur = ""; for (const p of text.split(/\n{2,}/)) { if (cur && cur.length + p.length + 2 > CHUNK_CHARS) { out.push(cur); cur = ""; } cur += (cur ? "\n\n" : "") + p; } if (cur) out.push(cur); return out; };
  const pieces = knowledge_areas.flatMap((a) => a.documents.map((d) => `=== KNOWLEDGE AREA: ${a.name} ===\n\n${(entry.kb[d] || "").trim()}`));
  const chunks = []; let cur = "";
  for (const p of pieces.flatMap(split)) { if (cur && cur.length + p.length > CHUNK_CHARS) { chunks.push(cur); cur = ""; } cur += (cur ? "\n\n" : "") + p; }
  if (cur) chunks.push(cur);
  const contextualUpdates = [brief, ...chunks.map((c, i) => `ROLE KNOWLEDGE (part ${i + 1} of ${chunks.length}). Reference material from the system, not from the learner. Use it as your source of truth for this role. Never read it aloud.\n\n${c}`)];

  const real = (v) => (v && !String(v).startsWith("REPLACE") ? v : null);
  return {
    config, dynamicVariables: vars, contextualUpdates, voiceId: real(persona.voice_id), avatarId: real(persona.avatar_id),
    publicRole: {
      id: config.id, industry: config.industry, title: profile.title, summary: profile.summary,
      skills: skills.map((s) => ({ name: s.name, description: s.description, icon: s.icon || null })),
      knowledge_areas: knowledge_areas.map((k) => ({ name: k.name, icon: k.icon || null })),
      coach_name: persona.coach_name, starter_questions: persona.starter_questions,
    },
  };
}

async function laFetch(p, init = {}) {
  let r;
  try {
    r = await fetch(`${LA_API}${p}`, { ...init, headers: { "X-API-KEY": SETTINGS.liveavatarApiKey, "Content-Type": "application/json", ...(init.headers || {}) } });
  } catch (e) {
    throw new Error("The browser couldn't reach LiveAvatar (network or CORS block). If this persists, run the server version: node server.mjs");
  }
  const text = await r.text(); let body; try { body = JSON.parse(text); } catch { body = { raw: text }; }
  if (!r.ok) throw new Error(`LiveAvatar ${r.status}: ${(body.message || body.detail?.[0]?.msg || text).toString().slice(0, 300)}`);
  return body;
}

async function mintSession(industryId, roleId) {
  const r = loadRoleLocal(industryId, roleId);
  if (SETTINGS.previewMode) return { mock: true, role: r.publicRole };
  const missing = [["LiveAvatar API key", CONFIG.liveavatarApiKey], ["ElevenLabs agent ID", CONFIG.elevenlabsAgentId], ["ElevenLabs secret ID", CONFIG.elevenlabsSecretId]].filter(([, v]) => !filled(v)).map(([k]) => k);
  if (missing.length) throw new Error(`This file isn't fully configured. Missing in CONFIG: ${missing.join(", ")}.`);
  const avatarId = r.avatarId || (filled(CONFIG.avatarId) ? CONFIG.avatarId : await firstAvatar());
  const cfg = { secret_id: SETTINGS.elevenlabsSecretId, agent_id: r.config.persona.elevenlabs_agent_id || SETTINGS.elevenlabsAgentId, dynamic_variables: r.dynamicVariables };
  if (r.voiceId) cfg.voice_id = r.voiceId;
  const out = await laFetch("/v1/sessions/token", {
    method: "POST",
    body: JSON.stringify({ mode: "LITE", avatar_id: avatarId, is_sandbox: !!SETTINGS.sandbox, video_settings: { quality: "high", encoding: "H264" }, elevenlabs_agent_config: cfg }),
  });
  return { session_token: out.data.session_token, session_id: out.data.session_id, role: r.publicRole, contextual_updates: r.contextualUpdates };
}

let _avatar = null;
async function firstAvatar() {
  if (_avatar) return _avatar;
  const mine = await laFetch("/v1/avatars?page_size=1").catch(() => null);
  const pick = mine?.data?.results?.[0] || (await laFetch("/v1/avatars/public?page_size=1")).data?.results?.[0];
  if (!pick) throw new Error("No LiveAvatar avatars available on this account.");
  return (_avatar = pick.id);
}
// ===== end standalone runtime =====
