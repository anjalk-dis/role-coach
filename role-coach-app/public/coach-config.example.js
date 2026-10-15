// Front-end config for the Spatius avatar. Loaded in the browser before the runtime.
// Copy this file to coach-config.js (gitignored) and fill in your values.
// The key ships to the browser by design: restrict it in Spatius (allowed domains, spend cap) and rotate it if it leaks.
window.COACH_CONFIG = {
  spatiusAppId: "your-spatius-app-id",
  spatiusApiKey: "your-spatius-api-key",
  spatiusAvatarId: "your-spatius-avatar-id", // leave "" to use the first avatar in your Spatius app
  spatiusRegion: "ap-northeast",
};
