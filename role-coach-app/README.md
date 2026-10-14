# Turo Role Coach: Accenture Innovation Hub

Three screens (**Industry → Role → Talk to your coach**). One role-agnostic ElevenLabs agent, with a LiveAvatar (HeyGen) face rendered over WebRTC.

```
Browser ──/api/session──▶ server.mjs ──POST /v1/sessions/token (LITE + elevenlabs_agent_config)──▶ LiveAvatar
   │                         │  └─ dynamic_variables (short role fields: name, title, skills…)
   │◀── session_token + contextual_updates (ROLE BRIEF + ROLE KNOWLEDGE chunks)
   └─ ElevenLabsAgentSession.start() → video + mic → sendContextualUpdate(...) → sendUserMessage on skill taps
```

**Why the knowledge goes in as context updates:** LiveAvatar caps each dynamic variable at about 1,000 characters. So the role's knowledge (about 35k characters) and the skill details go into the live session as silent `contextual_update` messages straight after connecting. Short fields still go in as `{{variables}}`.

## Run it (Windows, Node 18+)

```powershell
cd D:\Turo\Devwork\Accenture\role-coach-app
copy env.example .env        # first time only, then paste your LiveAvatar key into .env
node server.mjs
# open http://localhost:3000 in Chrome
```

No `npm install` is needed. The LiveAvatar SDK is bundled in `public/vendor/`.

To review the UI without an avatar or voice, set `MOCK_MODE=1` in `.env`.

## One-time setup (about 15 minutes)

### 1. ElevenLabs agent (`agent_2401m4x3htaxe3gr17aarh8enb5c`)
1. **System prompt:** paste the contents of `agent/system_prompt_template.md`. This replaces the earlier version: `{{role_knowledge}}` is gone, and knowledge now arrives as context updates.
2. **First message:**
   `Hi, I'm {{coach_name}}, and I'll be your {{role_title}} coach today. Tell me a little about what you do, and I'll suggest where we start.`
3. **Audio formats (required by LiveAvatar):**
   - Voice tab → TTS output format: **PCM 24000 Hz**
   - Advanced tab → User input audio format: **PCM 24000 Hz**
4. Knowledge base / RAG: off.
5. Dashboard test values for `{{…}}` variables are only needed for the **Test AI agent** button.

### 2. Register your ElevenLabs API key with LiveAvatar
Create an ElevenLabs API key (Settings → API Keys) with **convai_read, user_read, voices_read**. Free-tier keys are not supported. Then run:
```powershell
node scripts/setup-elevenlabs-secret.mjs <ELEVENLABS_API_KEY>
```
This saves `ELEVENLABS_SECRET_ID` into `.env`.

### 3. Pick the avatar
```powershell
node scripts/list-avatars.mjs                 # lists your avatars + public ones
node scripts/list-avatars.mjs <avatarId>      # saves LIVEAVATAR_AVATAR_ID to .env
```
A role can override the avatar with `persona.avatar_id`, and the voice with `persona.voice_id` (an ElevenLabs voice id), in its `config.json`.

### 4. Check
Open `http://localhost:3000/api/health`. `missing` should be `[]`.

## Add a role (no code change)
1. Create `content/roles/<industry>/<role>/config.json` and `kb/*.md`. Copy `bfsi/credit-risk-manager` as a template.
2. Add it to `content/catalogue.json` under its industry. Roles without a config show as **Coming soon**.
3. Go back to the industry screen. The catalogue reloads, so the role appears without a page refresh.

To serve content from Azure Blob instead, set `CONTENT_BASE_URL`, plus `CONTENT_SAS` if the container is private, in `.env`. Use the same folder layout.

## Kiosk behaviour
- Mic permission is requested when the visitor clicks **Meet your coach**, which also unlocks audio.
- Tapping a skill, knowledge area or starter question sends it to Maya as a spoken-style user message.
- The session ends after **90 s** with no learner speech. The end screen returns to the start after **20 s**.
- **Restart** (↻) starts a fresh conversation for the same role.

## Security
`.env` holds the LiveAvatar API key. It stays on the server and is never sent to the browser. Don't commit `.env`; it's already listed in `.gitignore`. Rotate the LiveAvatar key after the event, because it has been shared in chat.

## Files
```
server.mjs                 zero-dependency server (static + API + token minting)
lib/role.mjs               config + kb → dynamic variables + context updates
lib/env.mjs                .env loader
public/                    index.html, app.js, styles.css, assets/, vendor/liveavatar-sdk.esm.js
content/                   catalogue.json + roles/<industry>/<role>/{config.json, kb/}
agent/                     system prompt template + test script for the ElevenLabs agent
scripts/                   setup-elevenlabs-secret.mjs, list-avatars.mjs
```
