# Plan — Native iOS/Android (React Native + Expo), alongside web

> **Decision (2026-06-17):** ship truly-native iOS + Android apps **listed in
> both stores**, built in **parallel** with the (not-yet-launched) web app.
> Those three constraints together determine the stack: **React Native (Expo)**
> over a **shared, token-authed HTTP API**. Capacitor is ruled out ("truly
> native"); PWA-only is ruled out ("store listing"); native Swift+Kotlin is
> ruled out (2-person team). Recorded as ADR-016.

## The honest load (read this first)

This roughly **2.5–3×'s the build surface** and adds a permanent maintenance
tax (two store review cycles, signing, two crash setups, EAS build pipeline).
The genuine *risk* isn't boilerplate — it's three rewrites of web-specific tech
into native GPU/SDK work:

1. **The rituals** (`ogl` WebGL — charge fluid, destroy eye, the app's "soul")
   → re-implemented in **react-native-skia / expo-gl**. Shader/GPU work, the
   highest craft risk.
2. **The drawing canvas** (Fabric.js) → **react-native-skia**, gesture-driven.
3. **The map** (`mapbox-gl`/`react-map-gl`) → **@rnmapbox/maps** (native SDK,
   different API + native token config).

Plus two things people underestimate:
- **Apple IAP:** M7 is Stripe; Apple requires **StoreKit** for in-app digital
  goods (15–30%). Stripe-for-digital-goods in-app is against the rules → iOS
  needs a parallel IAP path (and Play Billing on Android).
- **AR** is WebAR (8th Wall) → must become **native ARKit/ARCore** on mobile.
  Post-launch, but it's a different SDK, not a port.

**Capacity truth:** 2 people + AI building web + iOS + Android + a shared API +
Skia rituals + native AR, before the web app has launched, is the maximal
surface. It is doable with AI assistance, but the only thing that keeps it sane
is **not forking the product**: one backend, one set of domain logic, mobile as
a new frontend over that shared core. If that discipline slips, this becomes
three codebases and stalls.

## Architecture: one core, two frontends

Restructure into a **monorepo** (pnpm workspaces + Turborepo):

```
apps/
  web/            ← existing Next.js app (moves here largely as-is)
  mobile/         ← new Expo / React Native app
packages/
  shared/         ← zod schemas (lib/validation), types (types/index.ts),
                    EMOTIONS, extractSigilCharacters + pure glyph logic,
                    the API contract types. Framework-agnostic TS.
  api-client/     ← typed fetch client both frontends call
  db/             ← Prisma schema + client (server-only)
```

The **`/api/*` routes become the single source of truth** for all mutations,
**token-authenticated** (not cookie-session — native can't ride Next-Auth
cookies cleanly). The web app migrates its server-action/server-component data
access to the same API (or keeps RSC for read SSR, but the API stays
authoritative for writes). This is the keystone — every native path needs it,
and it is **not throwaway work**: the web app benefits immediately.

### What is genuinely SHARED (→ `packages/shared`, backend)
- Domain logic: `extractSigilCharacters.ts`, glyph/layout math (pure TS).
- Validation: all zod schemas in `lib/validation`.
- Types + constants: `types/index.ts`, `EMOTIONS`.
- Business rules: vote toggle, slot limits, share-only-followed.
- The entire backend: API routes, Prisma, Postgres, Stripe webhook.

### What is REBUILT for native (no reuse)
- Every screen/component (no DOM, no Tailwind, no Next — Expo Router + RN
  primitives + a styling lib like Nativewind or Tamagui).
- Rituals → Skia/expo-gl. Drawing canvas → Skia. Map → @rnmapbox/maps.
- Auth UI (native Google sign-in). Navigation. Forms.
- AR → native ARKit/ARCore (post-launch).

## Phases (foundation is shared; it gates everything)

Even "in parallel," you cannot parallelize mobile UI until auth + the API
exist. So the real sequence is **foundation first (serves both), then web and
mobile proceed concurrently.**

### Phase 0 — Foundation (shared; do before any mobile UI)
- Monorepo restructure (apps/web, packages/shared, packages/db, api-client).
  - **2026-06-17 — pnpm + Turborepo workspace stood up; `packages/shared`
    (types, validation, EMOTIONS, extractSigilCharacters) + `packages/api-client`
    extracted.** The web app stays at the repo root and keeps its `@/` imports
    via thin re-export shims (low-churn; migrate to package specifiers later).
    `packages/db` deferred (Prisma is server-only, not mobile-shared, riskiest
    to extract). **`.npmrc` sets `node-linker=hoisted`** — pnpm's default
    isolated layout broke Prisma's generated-client resolution and
    eslint-config-next's bundled plugins; hoisting matches the npm layout the
    code was written against while keeping pnpm's store/workspaces/Turborepo.
    Verified green: typecheck/lint/build, unit 12/12, E2E 8/8.
- **Finish auth as token-based** — DONE (M1): Auth.js JWT, real Google sign-in
  verified, mobile Bearer path + `/api/auth/mobile`. Dev shim still on (fallback)
  until `AUTH_ENFORCED=true`.
- Make the REST API complete + authoritative for every mutation — DONE (A4):
  web writes go through `@sigilife/api-client` → `/api/*`.
- Extract `packages/shared` + `api-client` — DONE (above).

### Phase 1 — Mobile shell + core read flows
- Expo app boots, auth flow works, navigation skeleton (Office, Grimoire,
  Library, Profile, Friends). Read-only surfaces against the API.

### Phase 2 — Create flow (the hard native craft)
- Sigil drawing canvas in Skia; write→draw→style wizard; glyph rendering.

### Phase 3 — Rituals in Skia/GL
- Charge fluid + destroy eye re-implemented natively (the soul; budget real
  time here — 60fps on mid-range devices is the bar, same as web M5).

### Phase 4 — Map + social + monetization
- @rnmapbox/maps placement + votes; follows/share UI; **IAP** (StoreKit +
  Play Billing) for premium, parallel to web Stripe.

### Phase 5 — Store pipelines
- EAS Build, signing/provisioning, App Store + Play listings, review (budget
  multi-day latency + likely rejection rounds, esp. Apple 4.2 / IAP).

### Phase 6 (post-launch) — Native AR
- ARKit/ARCore replacing WebAR for the placement experience.

## Open questions / decisions to make
- Monorepo tool: pnpm workspaces + Turborepo (lean) vs Nx. (Lean: Turborepo.)
- RN styling: Nativewind (Tailwind-like, eases the mental switch) vs Tamagui
  (more native-perf, steeper). (Lean: Nativewind.)
- Auth token model: Auth.js JWT sessions shared, or a separate mobile token
  endpoint? (Decide in Phase 0.)
- Does web migrate fully to the API, or keep RSC reads + API writes? (Lean:
  RSC reads stay, all writes go through the API.)
- IAP vs Stripe split: iOS/Android IAP for in-app; keep Stripe for web only.
- Skia vs expo-gl for the rituals (Skia is higher-level; expo-gl is raw GL
  closer to the existing `ogl` shaders — may port the shader math more directly).

## What this does to the existing roadmap
Auth (M1) stops being "last" — it becomes the **first** shared dependency,
because both frontends gate on it. Everything else (M2–M7) already has a
backend that the API exposes; the mobile work is re-fronting it. AR (M8) stays
post-launch but its implementation changes from WebAR to native.
