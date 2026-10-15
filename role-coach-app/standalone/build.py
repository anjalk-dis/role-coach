#!/usr/bin/env python3
"""Build a single self-contained role-coach.html (no server needed).

  python standalone/build.py [--agent AGENT_ID] [--out role-coach.html]

Spatius values come from public/coach-config.js (copy coach-config.example.js and fill it in); they are embedded in the output.

Embeds: UI, styles, images, Spatius + ElevenLabs SDKs, catalogue, role configs and knowledge docs.
"""
import argparse, base64, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB, CONTENT = ROOT / "public", ROOT / "content"

ap = argparse.ArgumentParser()
ap.add_argument("--agent", default="")
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
            src = (role_dir.parent / "_shared" / doc[len("shared/"):]) if doc.startswith("shared/") else (role_dir / doc)
            kb[doc] = src.read_text("utf-8")
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
if "function createSessionController(" in app: app = app[: app.index("function createSessionController(")] + "route();"
app = app.replace('catalogue = await (await fetch("/api/catalogue", { cache: "no-store" })).json();', "catalogue = buildCatalogue();")
app = app.replace("const role = await (await fetch(`/api/roles/${industryId}/${roleId}`)).json();", "const role = loadRoleLocal(industryId, roleId).publicRole;")
app = re.sub(r'const r = await fetch\("/api/session".*?\n\s*const data = await r\.json\(\);\n\s*if \(!r\.ok\).*?\n',
             "const data = await mintSession(industryId, roleId);\n", app, count=1, flags=re.S)
assert "fetch(\"/api" not in app and "fetch(`/api" not in app, "unreplaced API call"

standalone = (ROOT / "standalone" / "spatius.js").read_text("utf-8")
standalone = standalone.replace("__ELEVENLABS_AGENT_ID__", a.agent or "__ELEVENLABS_AGENT_ID__")
# app.js ends with route(); keep it last
app_body = app.rstrip()
assert app_body.endswith("route();")
js = app_body[: -len("route();")] + "\n" + standalone + "\nroute();\n"

# ---- css (inline every /assets/... image as a data URI) ----
MIMES = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml"}
css = (PUB / "styles.css").read_text("utf-8")
css = re.sub(r'url\("/assets/([^"]+)"\)', lambda m: 'url("%s")' % data_uri(PUB / "assets" / m.group(1), MIMES[pathlib.Path(m.group(1)).suffix.lower()]), css)

# ---- browser-side Spatius config (public/coach-config.js) ----
cfg_file = PUB / "coach-config.js"
if not cfg_file.exists():
    cfg_file = PUB / "coach-config.example.js"
    print("WARNING: public/coach-config.js not found; embedding the example placeholders (avatar will not connect).")
coach_config = cfg_file.read_text("utf-8")
assert "</script" not in coach_config.lower()

# ---- html ----
html = (PUB / "index.html").read_text("utf-8")
html = html.replace('<link rel="stylesheet" href="/styles.css" />', f"<style>{css}</style>")
html = re.sub(r'src="/assets/([^"]+)"', lambda m: 'src="%s"' % data_uri(PUB / "assets" / m.group(1), MIMES[pathlib.Path(m.group(1)).suffix.lower()]), html)
html = re.sub(r"\s*<!-- runtime:start -->.*?<!-- runtime:end -->", "\n__RUNTIME__", html, flags=re.S)
html = html.replace("__RUNTIME__",
  f'<script type="application/json" id="content-data">{content_json}</script>\n'
  f"<script>{coach_config}</script>\n"
  f"<script>{wasm_shim}</script>\n<script>{sdk}</script>\n<script type=\"module\">{js}</script>")
assert 'src="/bundle.js"' not in html and 'wasm-shim.js' not in html and 'href="/styles.css"' not in html and 'src="/assets/' not in html and 'url("/assets/' not in html

pathlib.Path(a.out).write_text(html, "utf-8")
print(f"Wrote {a.out} ({len(html)/1024:.0f} KB), roles: {list(roles)}")
