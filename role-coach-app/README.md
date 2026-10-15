# Turo Role Coach: Disprz

Three screens (**Industry → Role → Talk to your coach**). One role-agnostic **ElevenLabs agent** is the brain and voice. The **Spatius** 3D avatar is Maya's face: it's rendered in the browser and lip-synced to the agent's audio.

```
Browser ── ElevenLabs agent (WebSocket): mic in, Maya's voice out (agent's own speaker muted)
   │          ├─ dynamic variables: short role fields ({{role_title}}, {{skills}} …)
   │          └─ context updates: ROLE BRIEF + ROLE KNOWLEDGE (the role's KB docs)
   └─ Maya's voice (PCM) ──▶ Spatius AvatarKit ──▶ lip-synced avatar + audio playback
```

There are two ways to run it. Both use the same screens and the same runtime (`standalone/spatius.js`).

| | `role-coach.html` (single file) | `node server.mjs` (server) |
|---|---|---|
| How to run | Double-click to open it in Chrome | `node server.mjs`, then http://localhost:3000 |
| Keys | Embedded in the file | Kept in `.env` on the server; the browser never sees the Spatius key |
| Content | Baked in at build time | Read live from `content/` or Azure Blob, so a new role appears without rebuilding |

## Server version

```powershell
cd D:\Turo\Devwork\Accenture\role-coach-app
copy env.example .env      # first time: paste your Spatius API key into .env
node server.mjs            # → http://localhost:3000
```

No `npm install` is needed. Open `/api/health` to check the setup; `missing` should be `[]`. To review the screens without the avatar or voice, set `MOCK_MODE=1`.

`.env` settings: `ELEVENLABS_AGENT_ID`, `AGENT_SAMPLE_RATE` (must match the agent's TTS output, currently 16000), `SPATIUS_APP_ID`, `SPATIUS_API_KEY`, `SPATIUS_AVATAR_ID`, `SPATIUS_REGION` (`ap-northeast`), `CONTENT_BASE_URL` / `CONTENT_SAS` (optional, for Azure Blob), `MOCK_MODE`.

## Single-file version

Rebuild it after changing content or code:
```powershell
python standalone/build.py --agent <agentId> --spatius-app <appId> --spatius-key <key> --spatius-avatar <avatarId>
```
This writes `role-coach.html`, which is about 6 MB because it includes the Spatius engine.

## ElevenLabs agent settings
- **System prompt:** `agent/system_prompt_template.md`.
- **First message:** use `{{coach_name}}` and `{{role_title}}`.
- **TTS output format:** PCM, matching `AGENT_SAMPLE_RATE`. 24000 Hz sounds better than 16000; if you change it, update the setting here and rebuild.
- **Authentication:** off. The browser connects with the agent ID.
- **Knowledge base / RAG:** off. Knowledge arrives as context updates instead.

## Add a role
1. Create `content/roles/<industry>/<role>/config.json` and `kb/*.md`. Copy an existing role as a template.
2. Add the role to `content/catalogue.json`.
3. Server version: go back to the industry screen and the role appears. Single file: rebuild.

## Kiosk notes
- Maya loads idle. Clicking **Start conversation** unlocks audio and the microphone; Chrome requires that click.
- Use a **headset**. With laptop speakers, the mic can pick up Maya and she interrupts herself.
- The session ends after 90 s of silence, and the end screen returns to the start after 20 s.
- To stop Chrome asking for the mic each time, click the icon at the left of the address bar and set Microphone to **Allow**.

## Files
```
server.mjs                  zero-dependency server: static files, /bundle.js, role API, Spatius token
lib/role.mjs, lib/env.mjs   role → dynamic variables + context updates; .env loader
public/                     index.html, app.js (screens), styles.css, assets/, vendor/ (Spatius + ElevenLabs bundle, WASM)
standalone/spatius.js       shared runtime: Spatius avatar + ElevenLabs agent session controller
standalone/build.py         builds the single-file role-coach.html
content/                    catalogue.json + roles/<industry>/<role>/{config.json, kb/}
agent/                      ElevenLabs system prompt template + test script
```
`scripts/` and `public/vendor/liveavatar-sdk.esm.js` were for the old HeyGen version. They're no longer used and can be deleted.

## Security
The single file contains the Spatius API key, so keep it on the demo machine. Rotate the keys that were shared in chat after the event: Spatius, LiveAvatar and ElevenLabs.
