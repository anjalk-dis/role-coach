#!/usr/bin/env python3
"""Build a single self-contained role-coach.html (no server needed).

  python standalone/build.py [--key LIVEAVATAR_KEY] [--agent AGENT_ID] [--out role-coach.html]

Embeds: UI, styles, images, Spatius + ElevenLabs SDKs, catalogue, role configs and knowledge docs.
"""
import argparse, base64, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB, CONTENT = ROOT / "public", ROOT / "content"

ap = argparse.ArgumentParser()
ap.add_argument("--agent", default="")
ap.add_argument("--spatius-app", default="")
ap.add_argument("--spatius-key", default="")
ap.add_argument("--spatius-avatar", default="")
ap.add_argument("--out", default=str(ROOT / "role-coach.html"))
a = ap.parse_args()

def data_uri(p, mime):
    return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()

# ---- content ----
catalogue = json.loads((CONTENT / "catalogue.json").read_text("utf-8"))
roles = {}
for cfg_path in sorted((CONTENT / "roles").glob("*/*/config.json")):
    role_dir = cfg_path.parent
    cfg = json.loads(cfg_path.read_text("utf-8"))
    kb = {}
    for area in cfg["knowledge_areas"]:
        for doc in area["documents"]:
            kb[doc] = (role_dir / doc).read_text("utf-8")
    roles[f"{role_dir.parent.name}/{role_dir.name}"] = {"config": cfg, "kb": kb}
content_json = json.dumps({"catalogue": catalogue, "roles": roles}, ensure_ascii=False).replace("</", "<\\/")

# ---- vendor: Spatius AvatarKit + ElevenLabs client (IIFE → window.CoachVendor) ----
sdk = (PUB / "vendor" / "coach-vendor.iife.js").read_text("utf-8")
assert "</script" not in sdk.lower()
# AvatarKit fetches its WASM next to the script; serve it from an embedded data URL instead (works from file://)
wasm_file = next((PUB / "vendor").glob("avatar_core_wasm-*.wasm"))
wasm_uri = data_uri(wasm_file, "application/wasm")
wasm_shim = ("(function(){var W=%s;var of=window.fetch.bind(window);window.fetch=function(i,o){var u=typeof i==='string'?i:(i&&i.url)||String(i);"
             "if(/avatar_core_wasm[^/]*\\.wasm(\\?|$)/.test(u))return of(W,o);return of(i,o);};})();") % json.dumps(wasm_uri)

# ---- app ----
app = (PUB / "app.js").read_text("utf-8")
app = re.sub(r"import\s*\{[^}]*\}\s*from\s*\"/vendor/liveavatar-sdk\.esm\.js\";", "", app, count=1)
app = app.replace("if (autoStartNext) { autoStartNext = false; ctl.start(); }\n  else ctl.showStart();", "autoStartNext = false;\n  ctl.showStart();")
assert "else ctl.showStart" not in app
app = app[: app.index("function createSessionController(")] + "route();"
app = app.replace('catalogue = await (await fetch("/api/catalogue", { cache: "no-store" })).json();', "catalogue = buildCatalogue();")
app = app.replace("const role = await (await fetch(`/api/roles/${industryId}/${roleId}`)).json();", "const role = loadRoleLocal(industryId, roleId).publicRole;")
app = re.sub(r'const r = await fetch\("/api/session".*?\n\s*const data = await r\.json\(\);\n\s*if \(!r\.ok\).*?\n',
             "const data = await mintSession(industryId, roleId);\n", app, count=1, flags=re.S)
assert "fetch(\"/api" not in app and "fetch(`/api" not in app, "unreplaced API call"

standalone = (ROOT / "standalone" / "spatius.js").read_text("utf-8")
standalone = standalone.replace("__ELEVENLABS_AGENT_ID__", a.agent or "__ELEVENLABS_AGENT_ID__").replace("__SPATIUS_APP_ID__", a.spatius_app or "__SPATIUS_APP_ID__").replace("__SPATIUS_API_KEY__", a.spatius_key or "__SPATIUS_API_KEY__").replace("__SPATIUS_AVATAR_ID__", a.spatius_avatar or "")
# app.js ends with route(); keep it last
app_body = app.rstrip()
assert app_body.endswith("route();")
js = app_body[: -len("route();")] + "\n" + standalone + "\nroute();\n"

# ---- css ----
hero = data_uri(PUB / "assets" / "hero.jpg", "image/jpeg")
css = (PUB / "styles.css").read_text("utf-8").replace('url("/assets/hero.jpg")', f'url("{hero}")')
css += """
.avatar-box { position: absolute !important; inset: 0 !important; z-index: 0; opacity: 0; transition: opacity .6s; background: #0c0718 url("__OFFICE_BG__") center / cover no-repeat; }
.stage.live .avatar-box, .stage.avatar-ready .avatar-box { opacity: 1; }
.avatar-box canvas { width: 100% !important; height: 100% !important; display: block; }
.stage .veil.soft { background: linear-gradient(180deg, rgba(7,4,15,0) 35%, rgba(7,4,15,.85) 100%); backdrop-filter: none; align-items: end; padding-bottom: 140px; z-index: 3; }\n.stage .veil { z-index: 3; }\n.stage .veil.soft h2 { text-shadow: 0 2px 12px rgba(0,0,0,.6); }
"""
for _p in sorted((PUB / "assets" / "industries").glob("*.jpg")):
    css = css.replace(f'url("/assets/industries/{_p.name}")', f'url("{data_uri(_p, "image/jpeg")}")')
css = css.replace("__OFFICE_BG__", data_uri(PUB / "assets" / "office-bg.webp", "image/webp"))
# ---- html ----
logo = data_uri(PUB / "assets" / "accenture-logo.png", "image/png")
html = (PUB / "index.html").read_text("utf-8")
html = html.replace('<link rel="stylesheet" href="/styles.css" />', f"<style>{css}</style>")
html = html.replace('src="/assets/accenture-logo.png"', f'src="{logo}"')
html = html.replace('<script type="module" src="/app.js"></script>',
  f'<script type="application/json" id="content-data">{content_json}</script>\n'
  f"<script>{wasm_shim}</script>\n<script>{sdk}</script>\n<script type=\"module\">{js}</script>")
assert 'src="/app.js"' not in html and 'href="/styles.css"' not in html and 'src="/assets/' not in html and 'url("/assets/' not in html

pathlib.Path(a.out).write_text(html, "utf-8")
print(f"Wrote {a.out} ({len(html)/1024:.0f} KB), roles: {list(roles)}")
