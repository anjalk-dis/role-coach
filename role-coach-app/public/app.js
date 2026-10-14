// Turo Role Coach: Accenture Innovation Hub
// Screens: #/  (industries)  →  #/roles/<industry>  →  #/coach/<industry>/<role>
import {
  ElevenLabsAgentSession, SessionEvent, AgentEventsEnum, SessionState, VoiceChatEvent,
} from "/vendor/liveavatar-sdk.esm.js";

const $app = document.getElementById("app");
const IDLE_END_MS = 90_000;     // end a live session after 90s with no learner speech
const RESET_AFTER_END_S = 20;   // return to start screen after session ends

// ------------------------------------------------------------------ icons
const P = {
  bank: '<path d="M3 10h18L12 4 3 10z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  heart: '<path d="M20.8 5.6a5 5 0 0 0-7.6-.4L12 6.4l-1.2-1.2A5 5 0 1 0 3.6 12.4L12 21l8.4-8.6a5 5 0 0 0 .4-6.8z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>',
  bag: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  factory: '<path d="M3 21V10l5 3V10l5 3V5h4l1 16H3z"/><path d="M7 17h2M12 17h2"/>',
  leaf: '<path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16z"/><path d="M5 21 13 13"/>',
  chart: '<path d="M4 20h16"/><rect x="5" y="13" width="3" height="5"/><rect x="10.5" y="9" width="3" height="9"/><rect x="16" y="4" width="3" height="14"/>',
  calculator: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
  pie: '<path d="M21 12A9 9 0 1 1 12 3v9h9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5z"/>',
  coins: '<ellipse cx="9" cy="6" rx="6" ry="2.5"/><path d="M3 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6"/><path d="M9 12.5v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4"/><ellipse cx="15" cy="12.5" rx="6" ry="2.5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  people: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 20v-2a5 5 0 0 1 10 0v2M2 20v-1.5A3 3 0 0 1 5 15.5M22 20v-1.5a3 3 0 0 0-3-3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="m15 9 5-5M17 4h3v3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/>',
  scale: '<path d="M12 4v16M5 20h14M6 8h12"/><path d="m6 8-3 6a3 3 0 0 0 6 0L6 8zM18 8l-3 6a3 3 0 0 0 6 0l-3-6z"/>',
  alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
  pulse: '<path d="M3 12h4l3-7 4 14 3-7h4"/>',
  book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1V5z"/><path d="M12 6v14"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  chevL: '<path d="m15 6-6 6 6 6"/>',
  chevR: '<path d="m9 6 6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  swap: '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  micOff: '<path d="M15 9.5V6a3 3 0 0 0-5.7-1.3M9 9v2a3 3 0 0 0 4.7 2.5M5 11a7 7 0 0 0 11.5 5.3M19 11a7 7 0 0 1-.6 2.8M12 18v3M3 3l18 18"/>',
  phone: '<path d="M3.5 13.5c4.7-4.2 12.3-4.2 17 0l-2 2.6-3.4-1.4V12c-2.1-.8-4.1-.8-6.2 0v2.7l-3.4 1.4-2-2.6z" fill="currentColor"/>',
  restart: '<path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6"/><path d="M4 3v5.6h5.6"/>',
  sparkle: '<path d="M12 2c.6 4.8 2.7 7.4 8 8-5.3.6-7.4 3.2-8 8-.6-4.8-2.7-7.4-8-8 5.3-.6 7.4-3.2 8-8z" fill="currentColor"/><path d="M19 15c.3 2 1.1 3 3 3.2-1.9.3-2.7 1.2-3 3.3-.3-2.1-1.1-3-3-3.3 1.9-.2 2.7-1.2 3-3.2z" fill="currentColor"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
};
const icon = (name, size = 24, sw = 1.7) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.target}</svg>`;
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ------------------------------------------------------------------ data
let catalogue = null;
async function getCatalogue(force = false) {
  if (!catalogue || force) catalogue = await (await fetch("/api/catalogue", { cache: "no-store" })).json();
  return catalogue;
}
function toast(msg, ms = 4000) {
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), ms);
}

// ------------------------------------------------------------------ router
let cleanupCurrent = null;
let autoStartNext = false;
async function route() {
  if (cleanupCurrent) { await cleanupCurrent(); cleanupCurrent = null; }
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  window.scrollTo(0, 0);
  try {
    if (parts[0] === "roles" && parts[1]) return await renderRoles(parts[1]);
    if (parts[0] === "coach" && parts[1] && parts[2]) return await renderCoach(parts[1], parts[2]);
    return await renderIndustries();
  } catch (e) {
    console.error(e);
    $app.innerHTML = `<section class="screen"><p class="eyebrow">Something went wrong</p><h1 class="title">Let's try that again.</h1><p class="subtitle">${esc(e.message)}</p><button class="cta" style="max-width:320px" onclick="location.hash='#/'">Start over</button></section>`;
  }
}
window.addEventListener("hashchange", route);
const go = (h) => { if (location.hash === h) route(); else location.hash = h; };

// ------------------------------------------------------------------ screen 1: industries
async function renderIndustries() {
  const cat = await getCatalogue(true); // always refresh so newly added roles appear
  $app.innerHTML = `
  <div class="hero-art"></div>
  <section class="screen split">
    <div>
      <h1 class="title">Choose your <em>industry.</em></h1>
      <p class="subtitle">Explore the industries where a coach can help professionals think, decide and perform.</p>
      <div class="industry-grid">
        ${cat.industries.map((ind) => `
          <button class="industry-card theme-${esc(ind.theme || "violet")} img-${esc(ind.id)}" data-id="${esc(ind.id)}" ${ind.available ? "" : "disabled"}>
            ${ind.available ? "" : `<span class="soon">Coming soon</span>`}
            <div class="row">
              <div class="stack"><div class="ic">${icon(ind.icon, 46, 1.5)}</div><div class="label">${esc(ind.name)}</div></div>
              <span class="arrow-btn">${icon("arrowR", 20)}</span>
            </div>
          </button>`).join("")}
      </div>
      <p class="foot-note">A voice-native AI experience · English</p>
    </div>
  </section>`;
  $app.querySelectorAll(".industry-card:not(:disabled)").forEach((b) =>
    b.addEventListener("click", () => {
      b.classList.add("selected");
      b.insertAdjacentHTML("afterbegin", `<span class="check">${icon("check", 18, 2.4)}</span>`);
      setTimeout(() => go(`#/roles/${b.dataset.id}`), 220);
    }));
}

// ------------------------------------------------------------------ screen 2: roles
async function renderRoles(industryId) {
  const cat = await getCatalogue();
  const ind = cat.industries.find((i) => i.id === industryId);
  if (!ind) return go("#/");
  let selected = (ind.roles.find((r) => r.available) || {}).id || null;

  $app.innerHTML = `
  <div class="hero-art"></div>
  <section class="screen split">
    <div>
      <button class="back" id="back"><span class="circle">${icon("arrowL", 20)}</span>Back to industries</button>
      <p class="eyebrow">${esc(ind.name)}</p>
      <h1 class="title">Choose your <em>role.</em></h1>
      <p class="subtitle">Select a role to meet your AI coach and explore the skills, decisions and challenges that define it.</p>
      <div class="role-grid" id="grid"></div>
      <button class="cta" id="meet">Meet your coach ${icon("arrowR", 22)}</button>
    </div>
  </section>`;

  const grid = document.getElementById("grid");
  const meet = document.getElementById("meet");
  const draw = (q = "") => {
    const roles = ind.roles.filter((r) => (r.name + " " + r.blurb).toLowerCase().includes(q.toLowerCase()));
    grid.innerHTML = roles.length ? roles.map((r) => `
      <button class="role-card ${r.id === selected ? "selected" : ""}" aria-pressed="${r.available ? r.id === selected : "false"}" data-id="${esc(r.id)}" ${r.available ? "" : "disabled"}>
        ${r.available ? "" : `<span class="soon">Coming soon</span>`}
        <span class="ic">${icon(r.icon, 46, 1.5)}</span>
        <span class="grow"><span class="nm">${esc(r.name)}</span><p>${esc(r.blurb)}</p></span>
        <span class="arrow-btn">${icon("arrowR", 20)}</span>
      </button>`).join("") : `<p class="empty">No roles match “${esc(q)}”.</p>`;
    grid.querySelectorAll(".role-card:not(:disabled)").forEach((b) => b.addEventListener("click", () => {
      if (selected === b.dataset.id) return startCoach();
      selected = b.dataset.id; draw();
    }));
    meet.disabled = !selected;
  };
  const startCoach = () => { if (!selected) return; autoStartNext = true; go(`#/coach/${industryId}/${selected}`); };
  draw();
  document.getElementById("back").onclick = () => go("#/");
  meet.onclick = startCoach;
}

// ------------------------------------------------------------------ screen 3: coach
async function renderCoach(industryId, roleId) {
  const cat = await getCatalogue();
  const ind = cat.industries.find((i) => i.id === industryId) || { name: "", roles: [] };
  const roleMeta = ind.roles.find((r) => r.id === roleId) || {};
  const role = await (await fetch(`/api/roles/${industryId}/${roleId}`)).json();
  if (role.error) throw new Error(role.error);
  const coach = role.coach_name || "your coach";

  $app.innerHTML = `
  <section class="screen coach-screen">
    <div class="coach" id="coach">
      <div>
        <button class="back" id="back" aria-label="Back to roles"><span class="circle">${icon("arrowL", 20)}</span><span class="back-label">Back to roles</span></button>
        <h1 class="sr-only">Talk to your AI coach, ${esc(coach)}</h1>

        <div class="sr-only" id="srLive" role="log" aria-live="polite"></div>
        <div class="stage" id="stage">
          <button class="explore-tab" id="exploreTab" aria-controls="side" aria-expanded="false">${icon("book", 20)}<span>Explore topics</span>${icon("chevL", 16)}</button>
          <video id="video" autoplay playsinline aria-label="Video of your AI coach"></video>
          <div class="veil" id="veil"></div>
          <div class="status" id="status" role="status" data-s="connecting"><span class="dot"></span><span id="statusText">Connecting</span><span class="bars"><i></i><i></i><i></i><i></i></span></div>
          <div class="captions">
            <div class="bubble bubble-coach hidden" id="coachBubble"><div class="who">${icon("wave", 20)}${esc(coach)}</div><div id="coachText"></div></div>
            <div class="bubble bubble-user hidden" id="userBubble">${icon("user", 24)}<div><div class="who">You</div><div class="txt" id="userText"></div></div></div>
          </div>
          <div class="controls">
            <button class="mic" id="mic" disabled><span class="round" id="micIcon">${icon("mic", 24)}</span><span id="micLabel">Mic on</span></button>
            <button class="end" id="end"><span class="round">${icon("phone", 30, 1.2)}</span><span class="end-label">End session</span></button>
            <button class="topics-btn" id="topicsBtn" aria-controls="side" aria-expanded="false">${icon("book", 20)}<span>Topics</span></button>
            <div class="icon-btns" id="moreWrap">
              <button class="icon-btn more-btn" id="moreBtn" aria-label="More options" aria-haspopup="menu" aria-expanded="false">${icon("more", 22)}</button>
              <div class="menu-pop" id="menuPop" role="menu">
                <button class="icon-btn menu-item" id="restart" role="menuitem" title="Restart conversation" aria-label="Restart conversation">${icon("restart", 22)}<span class="lbl">Restart conversation</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="side" id="side" aria-label="Coaching guide">
        <div class="sheet-head"><span class="sheet-grip" aria-hidden="true"></span></div>
        <div class="guide-head">
          ${icon("book", 22)}
          <div class="gh-text"><h2>Coaching guide</h2><span>${esc(role.title)}</span></div>
          <button class="sheet-close" id="sheetClose" aria-label="Close coaching guide">${icon("x", 20)}</button>
        </div>
        <div class="tabs" role="tablist" aria-label="Coaching topics">
          <button class="tab active" role="tab" id="tab-skills" aria-controls="list" data-tab="skills">Skills</button>
          <button class="tab" role="tab" id="tab-knowledge" aria-controls="list" data-tab="knowledge">Knowledge</button>
        </div>
        <p class="hint" id="hint"></p>
        <div class="list" id="list" role="tabpanel"></div>
        <button class="more" id="more" hidden></button>
        <div class="guide-sep"></div>
        <h3 class="guide-sub">${icon("bulb", 18)}Suggested questions</h3>
        <div class="list" id="questions">
          ${role.starter_questions.slice(0, 2).map((q) => `<button class="item q" data-say="${esc(q)}"><span class="grow">${esc(q)}</span>${icon("chevR", 18)}</button>`).join("")}
        </div>
      </aside>
    </div>
    <div class="sheet-backdrop" id="sheetBackdrop"></div>
  </section>`;

  // ---------- side panel ----------
  const list = document.getElementById("list");
  const hint = document.getElementById("hint");
  const PREVIEW = 3;
  let curTab = "skills", showAll = false;
  const more = document.getElementById("more");
  const drawTab = (tab, expand = false) => {
    showAll = expand;
    curTab = tab;
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.tab === tab;
      t.classList.toggle("active", on); t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
    });
    list.setAttribute("aria-labelledby", `tab-${tab}`);
    const skills = tab === "skills";
    hint.textContent = `Choose a topic to guide your conversation with ${coach}.`;
    const items = skills ? role.skills : role.knowledge_areas;
    const shown = showAll ? items : items.slice(0, PREVIEW);
    list.innerHTML = shown.map((x) => `<button class="item" data-say="${skills ? `Coach me on ${esc(x.name)}.` : `Tell me about ${esc(x.name)}.`}"${skills && x.description ? ` title="${esc(x.description)}"` : ""}><span class="ic">${icon(x.icon || (skills ? "target" : "book"), 22)}</span><span class="grow">${esc(x.name)}</span>${icon("chevR", 18)}</button>`).join("");
    more.hidden = items.length <= PREVIEW;
    more.textContent = showAll ? "Show fewer" : `View all ${skills ? "skills" : "knowledge areas"} (${items.length})`;
    more.setAttribute("aria-expanded", showAll);
  };
  more.onclick = () => drawTab(curTab, !showAll);
  document.querySelectorAll(".tab").forEach((t) => {
    t.onclick = () => drawTab(t.dataset.tab);
    t.onkeydown = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const other = [...document.querySelectorAll(".tab")].find((x) => x !== t);
      drawTab(other.dataset.tab); other.focus();
    };
  });
  drawTab("skills");

  // ---------- session controller ----------
  const ui = {
    stage: document.getElementById("stage"), video: document.getElementById("video"), veil: document.getElementById("veil"),
    status: document.getElementById("status"), statusText: document.getElementById("statusText"),
    coachBubble: document.getElementById("coachBubble"), coachText: document.getElementById("coachText"),
    userBubble: document.getElementById("userBubble"), userText: document.getElementById("userText"),
    mic: document.getElementById("mic"), micIcon: document.getElementById("micIcon"), micLabel: document.getElementById("micLabel"),
  };
  let autoCollapsed = false; // collapse once when the coach first speaks, then leave it to the learner
  ui.onLive = () => { document.body.classList.add("coach-live"); if (!autoCollapsed) { autoCollapsed = true; setSheet(false); } };
  const ctl = createSessionController({ industryId, roleId, role, ui });

  // ---------- coaching guide: collapsible side panel (desktop) / bottom sheet (phones) ----------
  const side = document.getElementById("side");
  const backdrop = document.getElementById("sheetBackdrop");
  const coachEl = document.getElementById("coach");
  const exploreTab = document.getElementById("exploreTab");
  const sheetMq = window.matchMedia("(max-width: 900px)");
  let sheetOpener = null;
  const setSheet = (open, opener, focus = true) => {
    side.classList.toggle("open", open); backdrop.classList.toggle("open", open);
    coachEl.classList.toggle("guide-open", open);
    exploreTab.setAttribute("aria-expanded", open); document.getElementById("topicsBtn")?.setAttribute("aria-expanded", open);
    document.body.classList.toggle("sheet-lock", open && sheetMq.matches);
    if (open) { const cs = document.querySelector(".coach-screen"); if (cs) cs.scrollTop = 0; }
    if (open) { sheetOpener = opener || null; if (focus) side.querySelector(".tab[aria-selected=true]")?.focus({ preventScroll: true }); }
    else if (sheetOpener) { sheetOpener.focus({ preventScroll: true }); sheetOpener = null; }
  };
  exploreTab.onclick = () => setSheet(true, exploreTab);
  const topicsBtn = document.getElementById("topicsBtn");
  topicsBtn.onclick = () => setSheet(true, topicsBtn);

  // overflow menu (phones): secondary actions live behind one button
  const moreWrap = document.getElementById("moreWrap"), moreBtn = document.getElementById("moreBtn");
  const setMenu = (open) => { moreWrap.classList.toggle("open", open); moreBtn.setAttribute("aria-expanded", open); };
  moreBtn.onclick = (e) => { e.stopPropagation(); setMenu(!moreWrap.classList.contains("open")); };
  const onDocClick = (e) => { if (!moreWrap.contains(e.target)) setMenu(false); };
  document.addEventListener("click", onDocClick);
  document.getElementById("sheetClose").onclick = () => setSheet(false);
  backdrop.onclick = () => setSheet(false);
  const onKey = (e) => { if (e.key !== "Escape") return; if (moreWrap.classList.contains("open")) setMenu(false); else if (side.classList.contains("open")) setSheet(false); };
  document.addEventListener("keydown", onKey);
  const onMq = () => setSheet(!sheetMq.matches, null, false);
  sheetMq.addEventListener("change", onMq);
  setSheet(!sheetMq.matches, null, false); // open until the conversation goes live (desktop only)

  side.addEventListener("click", (e) => {
    const b = e.target.closest("[data-say]");
    if (!b) return;
    if (!ctl.isLive()) return toast(`Start the conversation first, then tap to steer ${coach}.`);
    b.classList.add("flash"); setTimeout(() => b.classList.remove("flash"), 900);
    ctl.say(b.dataset.say);
    setTimeout(() => setSheet(false), 250);
  });
  document.getElementById("back").onclick = () => go(`#/roles/${industryId}`);
  document.getElementById("end").onclick = () => ctl.end("user");
  document.getElementById("restart").onclick = () => { setMenu(false); ctl.restart(); };
  ui.mic.onclick = () => ctl.toggleMic();

  cleanupCurrent = () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onDocClick); sheetMq.removeEventListener("change", onMq); document.body.classList.remove("sheet-lock", "coach-live"); return ctl.dispose(); };

  if (autoStartNext) { autoStartNext = false; ctl.start(); }
  else ctl.showStart(); // direct URL load: need a click to unlock mic/audio
}

function createSessionController({ industryId, roleId, role, ui }) {
  const coach = role.coach_name || "your coach";
  let session = null, mock = false, live = false, disposed = false;
  let idleTimer = null, resetTimer = null, coachBuf = "";

  const setStatus = (s, label) => { ui.status.dataset.s = s; ui.statusText.textContent = label; };
  const veil = (html) => { ui.veil.innerHTML = html; ui.stage.classList.remove("live"); };
  const showCoach = (t) => { ui.coachText.textContent = t; ui.coachBubble.classList.toggle("hidden", !t); };
  const announce = (who, t) => { const el = document.getElementById("srLive"); if (el && t) el.textContent = `${who}: ${t}`; };
  const showUser = (t) => { ui.userText.textContent = t; ui.userBubble.classList.toggle("hidden", !t); };
  const bumpIdle = () => { clearTimeout(idleTimer); idleTimer = setTimeout(() => live && end("idle"), IDLE_END_MS); };
  const setMicUI = (muted) => {
    ui.mic.classList.toggle("off", muted);
    ui.micIcon.innerHTML = icon(muted ? "micOff" : "mic", 24);
    ui.micLabel.textContent = muted ? "Mic off" : "Mic on";
    ui.mic.setAttribute("aria-label", muted ? "Microphone off, tap to turn on" : "Microphone on, tap to mute");
    if (live) setStatus(muted ? "muted" : "listening", muted ? "Mic off" : "Listening");
  };

  function showStart() {
    setStatus("connecting", "Ready");
    veil(`<div><div style="color:var(--accent-2)">${icon("sparkle", 56)}</div><h2>Meet ${esc(coach)}</h2><p>Your ${esc(role.title)} coach. Use your voice, and tap a skill on the right any time to steer the conversation.</p><button class="cta" id="go">Start conversation ${icon("arrowR", 20)}</button></div>`);
    ui.veil.querySelector("#go").onclick = start;
  }

  async function start() {
    if (disposed) return;
    clearTimeout(resetTimer);
    ui.stage.querySelector(".overlay")?.remove();
    showCoach(""); showUser("");
    setStatus("connecting", "Connecting");
    veil(`<div><div class="spinner"></div><h2>Connecting to ${esc(coach)}…</h2><p>Allow microphone access if your browser asks.</p></div>`);
    try {
      const r = await fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ industry: industryId, role: roleId }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || `Server error ${r.status}`);
      if (disposed) return;
      if (data.mock) return startMock();

      session = new ElevenLabsAgentSession(data.session_token, { autoKeepAlive: true });
      wire(session);
      await session.start();
      if (disposed) { session.stop().catch(() => {}); return; }

      // Deliver role brief + knowledge as silent context (too large for dynamic variables)
      for (const text of data.contextual_updates || []) session.sendContextualUpdate(text);

      live = true; ui.mic.disabled = false; setMicUI(session.voiceChat.isMuted); ui.onLive?.();
      bumpIdle();
    } catch (e) {
      console.error(e);
      setStatus("connecting", "Offline");
      veil(`<div><h2>Couldn't connect to ${esc(coach)}</h2><p>${esc(e.message)}</p><button class="cta" id="retry">Try again</button></div>`);
      ui.veil.querySelector("#retry").onclick = start;
    }
  }

  function wire(s) {
    s.on(SessionEvent.SESSION_STREAM_READY, () => {
      s.attach(ui.video);
      ui.video.play().catch(() => {
        veil(`<div><button class="cta" id="unmute">Tap to hear ${esc(coach)}</button></div>`);
        ui.veil.querySelector("#unmute").onclick = () => { ui.video.play(); ui.stage.classList.add("live"); };
      });
      ui.stage.classList.add("live");
    });
    s.on(SessionEvent.SESSION_DISCONNECTED, () => { if (live) end("disconnected"); });
    s.on(SessionEvent.SESSION_STATE_CHANGED, (st) => { if (st === SessionState.CONNECTING) setStatus("connecting", "Connecting"); });

    s.on(AgentEventsEnum.USER_SPEAK_STARTED, () => { setStatus("listening", "Listening"); bumpIdle(); });
    s.on(AgentEventsEnum.USER_SPEAK_ENDED, () => setStatus("thinking", "Thinking"));
    s.on(AgentEventsEnum.USER_TRANSCRIPTION_CHUNK, (e) => e.text && showUser(e.text));
    s.on(AgentEventsEnum.USER_TRANSCRIPTION, (e) => { if (e.text) { showUser(e.text); announce("You", e.text); } bumpIdle(); });

    s.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => { setStatus("speaking", "Speaking"); coachBuf = ""; });
    s.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => { if (live) setStatus(session?.voiceChat.isMuted ? "muted" : "listening", session?.voiceChat.isMuted ? "Mic off" : "Listening"); bumpIdle(); });
    s.on(AgentEventsEnum.AVATAR_TRANSCRIPTION_CHUNK, (e) => { if (e.text) { coachBuf += (coachBuf && !/^\s/.test(e.text) ? " " : "") + e.text; showCoach(tail(coachBuf)); } });
    s.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, (e) => { if (e.text) { showCoach(tail(e.text)); announce(coach, e.text); } });

    // ElevenLabs passthrough: fallback captions if the avatar transcript events don't arrive
    s.on(AgentEventsEnum.ELEVENLABS_AGENT_EVENT, (e) => {
      const d = e.data || {};
      if (e.elevenlabs_event_type === "user_transcript") {
        const t = d.user_transcription_event?.user_transcript || d.user_transcript;
        if (t) showUser(t);
      } else if (e.elevenlabs_event_type === "agent_response") {
        const t = d.agent_response_event?.agent_response || d.agent_response;
        if (t && !coachBuf) { showCoach(tail(t)); announce(coach, t); }
      }
    });
    s.on(AgentEventsEnum.SESSION_STOPPED, () => { if (live) end("stopped"); });
    s.voiceChat.on(VoiceChatEvent.MUTED, () => setMicUI(true));
    s.voiceChat.on(VoiceChatEvent.UNMUTED, () => setMicUI(false));
  }

  // keep the coach caption to the last ~45 words so it fits the bubble
  const tail = (t) => { const w = t.trim().split(/\s+/); return w.length > 45 ? "…" + w.slice(-45).join(" ") : t.trim(); };

  function say(text) {
    showUser(text); bumpIdle();
    if (mock) return mockReply(text);
    session?.sendUserMessage(text);
    setStatus("thinking", "Thinking");
  }

  async function toggleMic() {
    if (mock) { setMicUI(!ui.mic.classList.contains("off")); return; }
    if (!session) return;
    session.voiceChat.isMuted ? await session.voiceChat.unmute() : await session.voiceChat.mute();
  }

  async function stopSession() {
    live = false; clearTimeout(idleTimer); ui.mic.disabled = true;
    const s = session; session = null;
    if (s) { try { await s.stop(); } catch (e) { console.warn(e); } }
    ui.video.srcObject = null;
  }

  async function end(reason) {
    if (disposed) return;
    await stopSession();
    setStatus("connecting", "Ended");
    ui.stage.classList.remove("live");
    showCoach(""); showUser("");
    const msg = reason === "idle" ? "The session ended after a quiet spell." : reason === "disconnected" || reason === "stopped" ? "The session has ended." : "";
    let n = RESET_AFTER_END_S;
    ui.stage.insertAdjacentHTML("beforeend", `
      <div class="overlay"><div>
        <div style="color:var(--accent-2);display:grid;place-items:center">${icon("sparkle", 52)}</div>
        <h2>Thanks for talking with ${esc(coach)}</h2>
        <p>${esc(msg || "Ready for another conversation?")}</p>
        <div class="btns">
          <button class="cta" id="again">${icon("restart", 20)} Start again</button>
          <button class="ghost" id="other">Try another role</button>
        </div>
        <div class="countdown" id="cd">Returning to the start in ${n}s</div>
      </div></div>`);
    ui.stage.querySelector("#again").onclick = () => start();
    ui.stage.querySelector("#other").onclick = () => go("#/");
    const tick = () => {
      n -= 1;
      const cd = ui.stage.querySelector("#cd");
      if (!cd) return;
      if (n <= 0) return go("#/");
      cd.textContent = `Returning to the start in ${n}s`;
      resetTimer = setTimeout(tick, 1000);
    };
    resetTimer = setTimeout(tick, 1000);
  }

  async function restart() { await stopSession(); start(); }

  async function dispose() { disposed = true; clearTimeout(resetTimer); await stopSession(); }

  // ---------- mock mode (MOCK_MODE=1 on the server): UI without avatar/voice ----------
  function startMock() {
    mock = true; live = true; ui.mic.disabled = false; ui.video.style.display = "none"; ui.onLive?.();
    ui.stage.classList.add("live");
    setStatus("speaking", "Speaking");
    showCoach(`Hi, I'm ${coach}, and I'll be your ${role.title} coach today. Tell me a little about what you do, and I'll suggest where we start.`);
    setTimeout(() => live && setStatus("listening", "Listening"), 3500);
    bumpIdle();
  }
  function mockReply(text) {
    setStatus("thinking", "Thinking");
    setTimeout(() => {
      setStatus("speaking", "Speaking");
      showCoach(`Great question. Let's break "${text.replace(/\.$/, "")}" into a few key factors you should consider… (mock mode)`);
      setTimeout(() => live && setStatus("listening", "Listening"), 3000);
    }, 900);
  }

  window.addEventListener("beforeunload", () => session?.stop());
  return { start, showStart, say, toggleMic, end, restart, dispose, isLive: () => live };
}

route();
