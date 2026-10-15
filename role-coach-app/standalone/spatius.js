// ===== Coach runtime (Spatius avatar + ElevenLabs agent) =====
// Two modes: single-file (content embedded in the HTML) or server (node server.mjs serves content and the ElevenLabs agent id).
// Spatius values (app id, API key, avatar id, region) come from window.COACH_CONFIG (public/coach-config.js) in both modes;
// the browser fetches the Spatius session token itself.
const SERVER_MODE = !document.getElementById("content-data");
const CONTENT = SERVER_MODE ? null : JSON.parse(document.getElementById("content-data").textContent);
const { AvatarSDK, AvatarManager, AvatarView, DrivingServiceMode, ConversationState, ConnectionState, Conversation } = window.CoachVendor;

// ============ CONFIG: everything the demo needs lives here ============
let CONFIG = {
  elevenlabsAgentId: "__ELEVENLABS_AGENT_ID__",
  agentSampleRate: 16000,                 // must match the agent's TTS output format (currently PCM 16000 Hz)
  spatiusAppId: "__SPATIUS_APP_ID__",
  spatiusApiKey: "__SPATIUS_API_KEY__",
  spatiusAvatarId: "__SPATIUS_AVATAR_ID__", // blank = first avatar in your Spatius app
  spatiusRegion: "ap-northeast",          // your Spatius app lives in ap-northeast
  previewMode: false,                     // true = UI only, no avatar/voice
  ...(window.COACH_CONFIG || {}),         // public/coach-config.js
};
if (SERVER_MODE) CONFIG = { ...CONFIG, ...(await (await fetch("/api/config", { cache: "no-store" })).json()) };
const CONFIG_HINT = "Copy public/coach-config.example.js to public/coach-config.js and fill in your Spatius values.";
const MAX_VAR_CHARS = 1000, CHUNK_CHARS = 9000;
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
  return {
    config, dynamicVariables: vars, contextualUpdates,
    publicRole: {
      id: config.id, industry: config.industry, title: profile.title, summary: profile.summary,
      skills: skills.map((s) => ({ name: s.name, description: s.description, icon: s.icon || null })),
      knowledge_areas: knowledge_areas.map((k) => ({ name: k.name, icon: k.icon || null })),
      coach_name: persona.coach_name, starter_questions: persona.starter_questions,
    },
  };
}

// ---------- Spatius helpers ----------
let _sdkInit = null, _avatarIdP = null, _avatarCache = {};
const netErr = (what) => new Error(`The browser couldn't reach ${what} (network or browser security block).`);
function initSpatius() {
  if (!filled(CONFIG.spatiusAppId)) return Promise.reject(new Error(`Spatius app id is missing. ${CONFIG_HINT}`));
  return (_sdkInit ??= AvatarSDK.initialize(CONFIG.spatiusAppId, { region: CONFIG.spatiusRegion, drivingServiceMode: DrivingServiceMode.direct, logLevel: "error" })
    .catch((e) => { _sdkInit = null; throw e; }));
}
async function spatiusToken() {
  if (!filled(CONFIG.spatiusApiKey)) throw new Error(`Spatius API key is missing. ${CONFIG_HINT}`);
  let r;
  try {
    r = await fetch(`https://console.${CONFIG.spatiusRegion}.spatius.ai/v1/console/session-tokens`, {
      method: "POST", headers: { "X-API-Key": CONFIG.spatiusApiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ expireAt: Math.floor(Date.now() / 1000) + 3600 }),
    });
  } catch { throw netErr("Spatius to get a session token"); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.sessionToken) throw new Error(`Spatius token ${r.status}: ${j.error?.message || JSON.stringify(j).slice(0, 200)}`);
  return j.sessionToken;
}
function spatiusAvatarId() {
  if (filled(CONFIG.spatiusAvatarId)) return Promise.resolve(CONFIG.spatiusAvatarId);
  if (!filled(CONFIG.spatiusApiKey)) return Promise.reject(new Error(`Spatius API key is missing. ${CONFIG_HINT}`));
  return (_avatarIdP ??= (async () => {
    let r;
    try { r = await fetch("https://console.spatius.ai/v1/open/avatars?pagination.pageSize=20", { headers: { "X-App-ID": CONFIG.spatiusAppId, "X-API-Key": CONFIG.spatiusApiKey } }); }
    catch { throw netErr("Spatius to list avatars. Set spatiusAvatarId in CONFIG"); }
    const j = await r.json().catch(() => ({}));
    const id = j.avatars?.[0]?.id;
    if (!id) throw new Error(`No Spatius avatar found (${r.status}). Add one in Spatius Studio or set spatiusAvatarId in CONFIG.`);
    console.info("[coach] Using Spatius avatar", j.avatars[0].name, id);
    return id;
  })().catch((e) => { _avatarIdP = null; throw e; }));
}
// Catalogue + role info for the screens (embedded content, or the server API)
async function fetchCatalogue() {
  if (!SERVER_MODE) return buildCatalogue();
  return (await fetch("/api/catalogue", { cache: "no-store" })).json();
}
async function fetchRoleInfo(industryId, roleId) {
  if (!SERVER_MODE) return loadRoleLocal(industryId, roleId).publicRole;
  const j = await (await fetch(`/api/roles/${industryId}/${roleId}`)).json();
  if (j.error) throw new Error(j.error);
  return j;
}
// Role variables + context updates for the agent
async function getRoleData(industryId, roleId) {
  if (!SERVER_MODE) return loadRoleLocal(industryId, roleId);
  const r = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ industry: industryId, role: roleId }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `Server error ${r.status}`);
  return { dynamicVariables: j.dynamic_variables, contextualUpdates: j.contextual_updates };
}
function b64ToArrayBuffer(b64) {
  const bin = atob(b64); const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

// ---------- Session controller: ElevenLabs (brain + voice) → Spatius (face + playback) ----------
function createSessionController({ industryId, roleId, role, ui }) {
  const coach = role.coach_name || "your coach";
  const roleDataP = getRoleData(industryId, roleId); roleDataP.catch(() => {});
  let view = null, ctrl = null, conv = null, live = false, disposed = false, mock = false, prepared = null;
  let streaming = false, held = null, endTimer = null, idleTimer = null, resetTimer = null, micMuted = false;

  ui.video.style.display = "none";
  const box = document.createElement("div");
  box.className = "avatar-box";
  ui.stage.insertBefore(box, ui.veil);

  const setStatus = (s, label) => { ui.status.dataset.s = s; ui.statusText.textContent = label; };
  const veil = (html, soft = false) => { ui.veil.innerHTML = html; ui.veil.classList.toggle("soft", soft); ui.veil.style.opacity = "1"; ui.veil.style.pointerEvents = "auto"; };
  const hideVeil = () => { ui.veil.style.opacity = "0"; ui.veil.style.pointerEvents = "none"; };
  const showCoach = (t) => { ui.coachText.textContent = t; ui.coachBubble.classList.toggle("hidden", !t); };
  const showUser = (t) => { ui.userText.textContent = t; ui.userBubble.classList.toggle("hidden", !t); };
  const tail = (t) => { const w = t.trim().split(/\s+/); return w.length > 45 ? "…" + w.slice(-45).join(" ") : t.trim(); };
  const bumpIdle = () => { clearTimeout(idleTimer); idleTimer = setTimeout(() => live && end("idle"), IDLE_END_MS); };
  const listeningLabel = () => (micMuted ? ["muted", "Mic off"] : ["listening", "Listening"]);
  const setMicUI = (muted) => {
    micMuted = muted;
    ui.mic.classList.toggle("off", muted);
    ui.micIcon.innerHTML = icon(muted ? "micOff" : "mic", 24);
    ui.micLabel.textContent = muted ? "Mic off" : "Mic on";
    if (live && ui.status.dataset.s !== "speaking") setStatus(...listeningLabel());
  };

  // Load the avatar as soon as the screen opens, so Maya is visible (idle) before the conversation starts
  function prepare() {
    if (CONFIG.previewMode) return Promise.resolve();
    return (prepared ??= (async () => {
      await initSpatius();
      const id = await spatiusAvatarId();
      const avatar = _avatarCache[id] ||= await AvatarManager.shared.load(id);
      if (disposed) return;
      view = new AvatarView(avatar, box, { audioFormat: { channelCount: 1, sampleRate: CONFIG.agentSampleRate, opusUplinkEnabled: false } });
      ctrl = view.controller;
      await new Promise((res) => { view.onFirstRendering = res; setTimeout(res, 10000); });
      ui.stage.classList.add("avatar-ready");
      ctrl.onConversationState = (s) => {
        if (!live) return;
        if (s === ConversationState.playing) { setStatus("speaking", "Speaking"); ui.onLive?.(); }
        else setStatus(...listeningLabel());
      };
      ctrl.onConnectionState = (s) => { if (s === ConnectionState.failed && live) end("disconnected"); };
      ctrl.onError = (e) => console.warn("[spatius]", e);
    })().catch((e) => { prepared = null; throw e; }));
  }

  function showStart() {
    setStatus("connecting", "Ready");
    veil(`<div><div class="spinner"></div><h2>Getting ${esc(coach)} ready…</h2><p>Loading your ${esc(role.title)} coach.</p></div>`);
    prepare().then(() => {
      if (disposed) return;
      veil(`<div><h2>Meet ${esc(coach)}</h2><p>Your ${esc(role.title)} coach. Speak naturally, and tap a skill on the right any time to steer the conversation.</p><button class="cta" id="go">Start conversation ${icon("arrowR", 20)}</button></div>`, true);
      ui.veil.querySelector("#go").onclick = start;
    }).catch((e) => showError(e));
  }

  function showError(e) {
    console.error(e);
    setStatus("connecting", "Offline");
    const msg = /permission|notallowed/i.test(String(e?.name) + String(e?.message)) ? "Microphone access is needed to talk to " + coach + ". Click Try again and choose Allow when Chrome asks." : (e.message || e);
    veil(`<div><h2>Couldn't connect to ${esc(coach)}</h2><p>${esc(msg)}</p><button class="cta" id="retry">Try again</button></div>`);
    ui.veil.querySelector("#retry").onclick = () => (ctrl ? start() : showStart());
  }

  // Must be called from a click (audio unlock)
  async function start() {
    if (disposed) return;
    const audioUnlock = ctrl ? ctrl.initializeAudioContext() : null; // synchronous first call inside the gesture
    clearTimeout(resetTimer);
    ui.stage.querySelector(".overlay")?.remove();
    showCoach(""); showUser("");
    setStatus("connecting", "Connecting");
    veil(`<div><div class="spinner"></div><h2>Connecting to ${esc(coach)}…</h2><p>Allow microphone access if your browser asks.</p></div>`);
    try {
      if (CONFIG.previewMode) return startMock();
      if (!ctrl) { await prepare(); return showStart(); } // avatar wasn't ready: one more tap needed
      await audioUnlock;
      const roleData = await roleDataP;
      AvatarSDK.setSessionToken(await spatiusToken());
      await ctrl.start();
      if (disposed) return;

      streaming = true;
      conv = await Conversation.startSession({
        agentId: CONFIG.elevenlabsAgentId,
        connectionType: "websocket",
        dynamicVariables: roleData.dynamicVariables,
        onConversationMetadata: (m) => {
          const fmt = m?.agent_output_audio_format || "";
          const rate = Number((fmt.match(/^pcm_(\d+)$/) || [])[1]);
          if (fmt && !rate) console.error(`[coach] Agent output format ${fmt} isn't PCM. Set the agent's TTS output to PCM ${CONFIG.agentSampleRate} Hz or change CONFIG.agentSampleRate.`);
          else if (rate && rate !== CONFIG.agentSampleRate) console.error(`[coach] Agent outputs ${rate} Hz but CONFIG.agentSampleRate is ${CONFIG.agentSampleRate}. Set the agent's TTS output to PCM ${CONFIG.agentSampleRate} Hz or change CONFIG.agentSampleRate.`);
        },
        onAudio: (b64) => feed(b64ToArrayBuffer(b64)),
        onInterruption: () => { dropTurn(); },
        onMessage: (m) => {
          const who = m.role || m.source;
          if (who === "user") { showUser(m.message); bumpIdle(); setStatus("thinking", "Thinking"); }
          else showCoach(tail(m.message));
        },
        onModeChange: ({ mode }) => { if (mode === "listening" && live && ui.status.dataset.s === "thinking") setStatus(...listeningLabel()); },
        onDisconnect: () => { if (live) end("disconnected"); },
        onError: (msg, ctx) => console.warn("[elevenlabs]", msg, ctx),
      });
      conv.setVolume({ volume: 0 }); // the avatar plays the voice, lip-synced
      for (const text of roleData.contextualUpdates) conv.sendContextualUpdate(text);

      live = true; ui.mic.disabled = false; setMicUI(false);
      hideVeil(); setStatus("listening", "Listening");
      bumpIdle();
    } catch (e) {
      await stopSession();
      showError(e);
    }
  }

  // Stream agent audio to the avatar as it arrives (raw PCM uplink); flag the end of the turn after a short gap.
  function feed(buf) {
    if (!ctrl || !streaming || disposed) return;
    try { ctrl.send(buf, false); held = true; } catch (e) { console.warn(e); }
    clearTimeout(endTimer);
    endTimer = setTimeout(() => { if (held && ctrl && streaming) { try { ctrl.send(new ArrayBuffer(0), true); } catch (e) { console.warn(e); } held = null; } }, 450);
  }
  function dropTurn() { clearTimeout(endTimer); held = null; try { ctrl?.interrupt(); } catch {} }

  function say(text) {
    showUser(text); bumpIdle();
    if (mock) return mockReply(text);
    dropTurn();
    conv?.sendUserMessage(text);
    setStatus("thinking", "Thinking");
  }

  function toggleMic() {
    if (mock) return setMicUI(!micMuted);
    if (!conv) return;
    conv.setMicMuted(!micMuted); setMicUI(!micMuted);
  }

  async function stopSession() {
    live = false; streaming = false; clearTimeout(idleTimer); dropTurn(); ui.mic.disabled = true;
    const c = conv; conv = null;
    if (c) { try { await c.endSession(); } catch (e) { console.warn(e); } }
    try { ctrl?.close(); } catch {}
  }

  async function end(reason) {
    if (disposed) return;
    await stopSession();
    setStatus("connecting", "Ended");
    showCoach(""); showUser("");
    const msg = reason === "idle" ? "The session ended after a quiet spell." : reason === "disconnected" ? "The session has ended." : "";
    let n = RESET_AFTER_END_S;
    ui.stage.insertAdjacentHTML("beforeend", `
      <div class="overlay"><div>
        <div style="color:var(--accent-2);display:grid;place-items:center">${icon("sparkle", 52)}</div>
        <h2>Thanks for talking with ${esc(coach)}</h2>
        <p>${esc(msg || "Ready for another conversation?")}</p>
        <div class="btns"><button class="cta" id="again">${icon("restart", 20)} Start again</button><button class="ghost" id="other">Try another role</button></div>
        <div class="countdown" id="cd">Returning to the start in ${n}s</div>
      </div></div>`);
    ui.stage.querySelector("#again").onclick = () => start();
    ui.stage.querySelector("#other").onclick = () => go("#/");
    const tick = () => {
      n -= 1; const cd = ui.stage.querySelector("#cd"); if (!cd) return;
      if (n <= 0) return go("#/");
      cd.textContent = `Returning to the start in ${n}s`; resetTimer = setTimeout(tick, 1000);
    };
    resetTimer = setTimeout(tick, 1000);
  }

  async function restart() { await stopSession(); start(); }
  async function dispose() { disposed = true; clearTimeout(resetTimer); await stopSession(); try { view?.dispose(); } catch {} }

  // ---------- preview mode ----------
  function startMock() {
    mock = true; live = true; ui.mic.disabled = false;
    ui.stage.classList.add("live"); hideVeil();
    setStatus("speaking", "Speaking"); ui.onLive?.();
    showCoach(`Hi, I'm ${coach}, and I'll be your ${role.title} coach today. Tell me a little about what you do, and I'll suggest where we start.`);
    setTimeout(() => live && setStatus("listening", "Listening"), 3500);
    bumpIdle();
  }
  function mockReply(text) {
    setStatus("thinking", "Thinking");
    setTimeout(() => { setStatus("speaking", "Speaking"); showCoach(`Great question. Let's break "${text.replace(/\.$/, "")}" into a few key factors… (preview mode)`); setTimeout(() => live && setStatus("listening", "Listening"), 3000); }, 900);
  }

  window.addEventListener("beforeunload", () => { conv?.endSession(); try { ctrl?.close(); } catch {} });
  return { start, showStart, say, toggleMic, end, restart, dispose, isLive: () => live };
}
// ===== end standalone runtime =====
