// Turns a role's config.json + knowledge docs into:
//   - dynamicVariables  : short values for the ElevenLabs prompt template ({{...}})
//   - contextualUpdates : ROLE BRIEF + ROLE KNOWLEDGE, sent into the live session
//                         (LiveAvatar caps each dynamic variable at ~1000 chars,
//                          so anything long travels this way instead)
//   - publicRole        : what the browser needs to render the coach screen

const MAX_VAR_CHARS = Number(process.env.MAX_VAR_CHARS || 1000);
const CHUNK_CHARS = Number(process.env.CONTEXT_CHUNK_CHARS || 9000);

const bullets = (items) => items.map((s) => `- ${s}`).join("\n");

export async function loadRole(readText, industryId, roleId) {
  const base = `roles/${industryId}/${roleId}`;
  const config = JSON.parse(await readText(`${base}/config.json`));
  const { profile, skills, knowledge_areas, persona } = config;

  // ---------- Dynamic variables (short) ----------
  const vars = {
    coach_name: persona.coach_name,
    coach_background: persona.background,
    coaching_tone: persona.tone,
    role_title: profile.title,
    role_seniority: profile.seniority,
    role_summary: profile.summary,
    role_responsibilities: bullets(profile.responsibilities),
    industry: config.industry,
    skills: skills.map((s, i) => `${i + 1}. ${s.name}`).join("\n"),
    knowledge_areas: bullets(knowledge_areas.map((k) => k.name)),
    starter_questions: bullets(persona.starter_questions),
  };

  // Anything over the limit moves into the ROLE BRIEF instead of being truncated.
  const overflow = {};
  for (const [k, v] of Object.entries(vars)) {
    if (String(v).length > MAX_VAR_CHARS) {
      overflow[k] = v;
      vars[k] = "(see the ROLE BRIEF context update)";
    }
  }

  // ---------- ROLE BRIEF ----------
  let brief =
    `ROLE BRIEF for this session. This is part of your instructions from the system, not something the learner said. Do not mention it or read it aloud.\n\n` +
    `Role: ${profile.title} (${profile.seniority}), ${config.industry}.\n\n` +
    `Skills in detail (name: what it covers. Expected proficiency):\n` +
    skills.map((s, i) => `${i + 1}. ${s.name}: ${s.description} Expected proficiency: ${s.proficiency}`).join("\n");
  for (const [k, v] of Object.entries(overflow)) brief += `\n\n${k}:\n${v}`;

  // ---------- ROLE KNOWLEDGE (chunked) ----------
  const pieces = [];
  for (const area of knowledge_areas) {
    for (const doc of area.documents) {
      // "shared/..." docs live in roles/<industry>/_shared/ and are reused across that industry's roles
      const docPath = doc.startsWith("shared/") ? `roles/${industryId}/_shared/${doc.slice(7)}` : `${base}/${doc}`;
      const text = (await readText(docPath)).trim();
      pieces.push(`=== KNOWLEDGE AREA: ${area.name} ===\n\n${text}`);
    }
  }
  const chunks = [];
  let cur = "";
  for (const p of pieces.flatMap((p) => splitLong(p, CHUNK_CHARS))) {
    if (cur && cur.length + p.length > CHUNK_CHARS) { chunks.push(cur); cur = ""; }
    cur += (cur ? "\n\n" : "") + p;
  }
  if (cur) chunks.push(cur);

  const contextualUpdates = [
    brief,
    ...chunks.map((c, i) =>
      `ROLE KNOWLEDGE (part ${i + 1} of ${chunks.length}). Reference material from the system, not from the learner. Use it as your source of truth for this role. Never read it aloud.\n\n${c}`
    ),
  ];

  const publicRole = {
    id: config.id,
    industry: config.industry,
    title: profile.title,
    summary: profile.summary,
    skills: skills.map((s) => ({ name: s.name, description: s.description, icon: s.icon || null })),
    knowledge_areas: knowledge_areas.map((k) => ({ name: k.name, icon: k.icon || null })),
    coach_name: persona.coach_name,
    starter_questions: persona.starter_questions,
  };

  const voiceId = persona.voice_id && !persona.voice_id.startsWith("REPLACE") ? persona.voice_id : null;
  const avatarId = persona.avatar_id && !persona.avatar_id.startsWith("REPLACE") ? persona.avatar_id : null;

  return { config, dynamicVariables: vars, contextualUpdates, publicRole, voiceId, avatarId };
}

function splitLong(text, max) {
  if (text.length <= max) return [text];
  const out = [];
  let cur = "";
  for (const para of text.split(/\n{2,}/)) {
    if (cur && cur.length + para.length + 2 > max) { out.push(cur); cur = ""; }
    cur += (cur ? "\n\n" : "") + para;
  }
  if (cur) out.push(cur);
  return out;
}
