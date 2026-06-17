# Native mobile testing (Android)

How the agent (and you) run `apps/mobile` on a real Android emulator. Set up
2026-06-17 on the Linux dev box (MURDERFACE), entirely user-space.

> **iOS is not testable from this Linux box.** The iOS Simulator is a macOS
> app; running macOS on non-Apple hardware violates Apple's license. iOS
> verification happens on a Mac or a physical iPhone (Expo Go), or a cloud Mac
> later. Android coverage catches the large majority of issues since the app
> is one RN codebase over one shared API.

## What's installed (user-space, under `~/Android`)
- JDK 17 (Temurin) — `~/Android/jdk17`
- Android SDK — `~/Android/Sdk` (platform-tools/adb, emulator, platform 34,
  `system-images;android-34;google_apis;x86_64`)
- AVD `sigilife` (Pixel 6, API 34, x86_64; KVM-accelerated via `/dev/kvm`)
- Env: `source ~/Android/env.sh` (exports JAVA_HOME / ANDROID_HOME / PATH)
- **mobile MCP** (`@mobilenext/mobile-mcp`) registered in Claude (local scope) —
  gives the agent screenshot/tap/element tools; **loads on session start**, so
  reload the session after first setup to get the tools.

## Run the app on the emulator
```bash
source ~/Android/env.sh
bash ~/Android/start-emulator.sh                       # boot the AVD (headless)

# 1) API server, reachable from the emulator:
pnpm exec next dev -H 0.0.0.0 -p 3000                   # in the repo root

# 2) the app — point it at the host and use a free Metro port:
cd apps/mobile
EXPO_PUBLIC_API_URL=http://10.0.2.2:3000 pnpm exec expo start --android --port 8083
```

### Gotchas (learned the hard way)
- **API host = `10.0.2.2`, not `localhost`.** On the Android emulator,
  `localhost` is the emulator itself; `10.0.2.2` is the host machine. So the
  app must use `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000`.
- **Metro port 8081 is taken** on this box by the Docker `llama-server`
  (gemma4-judge). Use `--port 8083` (or any free port).
- The Next dev server must bind `-H 0.0.0.0` so the emulator can reach it.

## Driving it without the MCP (plain adb)
```bash
adb exec-out screencap -p > /tmp/s.png                 # screenshot
ffmpeg -y -i /tmp/s.png -vf scale=820:-1 /tmp/s-small.png   # shrink <2000px to view
adb shell input tap <x> <y>                            # tap (real-device coords)
adb shell input text 'hello'                           # type
adb shell dumpsys window | grep mCurrentFocus          # which app/activity is up
```
Coordinate note: screenshots are 1080×2400; if you view a downscaled copy,
multiply tap coords back up by the scale factor (1080 / shrunk-width).

## Verified 2026-06-17
Office hub + Library both render on the emulator; Library lists "Steady Hands"
fetched live from Postgres via the shared API client — full
RN → @sigilife/api-client → /api/sigils → Prisma → DB path confirmed on-device.
Sign-in is still a scaffold (native Google OAuth client IDs pending).
