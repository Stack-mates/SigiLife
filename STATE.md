# STATE — where SigiLife stands (2026-06-17)

Living status doc. Branch: `rebuild/nextjs-scaffold` (all work pushed, clean tree).
Run it: `docker compose up -d db && npm run dev` (→ http://localhost:3000).
Verify: `npm run test` (unit), `npm run test:e2e` (browser), `npm run build`.

## ✅ Done and test-verified — the core product works end to end

The full loop runs against a real database and is guarded by an automated
browser test (`tests/e2e/loop.spec.ts`, passing):

land → enter → (first-run tutorial) → **The Office** hub → write an intention
→ draw on the single-canvas editor (vector letterforms traced live) → style
+ name → **keep** (saved to Postgres) → **library** → open a sigil → **vote**
(community energy) → **charge** ritual (emotion + fluid trace) → charged badge
persists → **destroy** ritual (evil eye) → **Closed cases**. Plus profile
stats, settings (with clear-data), and a global nav menu.

Foundations:
- **Next.js** App Router, self-hosting deploy path documented (Docker +
  Cloudflare Tunnel, ADR-012) — not Vercel. Dev server on **:3000**.
- **Postgres + Prisma**. Web writes now go through the **authenticated REST
  API** (`/api/...`, refactor A4) — zod-validated, shared error envelope.
- **Real Google auth landed** (M1, ADR-016): Auth.js (NextAuth v5), Google
  provider, PrismaAdapter, JWT sessions. One token serves web cookies AND the
  mobile Bearer path. `create-profile` onboarding sets the username.
  - Identity resolution (`lib/auth.ts`): real session user if signed in, else a
    **dev-shim** user — *unless* `AUTH_ENFORCED=true` (prod), which requires a
    real login. The shim keeps local dev + E2E credential-less; flip the flag in
    prod. `.env` already carries `AUTH_SECRET` + Google client id/secret.
- **Monorepo** (pnpm + Turborepo, ADR/commit bd4214a):
  - `packages/shared` — domain types/logic; `packages/api-client` — typed REST client.
  - `apps/mobile` — **Expo / React Native** app, Phase 1 shell (signin, home
    index, library screens + read flow). Runs natively on the Android emulator
    from this Linux box (see `docs/MOBILE_TESTING.md`); iOS is macOS-only.
- **Tests:** Vitest unit (12) + Playwright E2E (8) — both green, build clean
  (re-verified 2026-06-17). Docs: full set in `docs/` (specs, ADRs 001–016,
  per-milestone plans).

## ⛔ Blocked — each needs ONE thing from you

| Feature | Blocked on | When unblocked |
|---|---|---|
| **Map** (place sigils, see the shared world) | a free **Mapbox token** (`NEXT_PUBLIC_MAPBOX_TOKEN`) + the `Place`-model decision (lean: yes) | I build WorldMap/markers/placement; VotePanel already plugs in |
| **Monetization** | **Stripe** keys (test mode is fine to start) | I build checkout + webhook → entitlements (schema + `/api/stripe/*` stubs already there) |
| **AR** (8th Wall) | post-launch decision | scaffolded; revisit after launch (ADR-007) |

Google auth is no longer blocked — creds are in `.env` and it's implemented.
I did **not** fake the Mapbox/Stripe credentials or build their UIs blind.

## Visual state — reviewed via screenshots (2026-06-14)

I *can* see the UI — `scripts/screenshots.mjs` captures pages to PNGs an
image-capable read tool views; chrome-devtools MCP drives the real Brave at
:3000 for interactive/WebGL review. A phone-viewport pass over landing, home +
tutorial overlay, write step, library, sigil page, profile, settings rendered
cleanly and cohesively (Lino portraits/avatar, sigil ring+glow, charged badge,
vote panel). Fixed one bug: nav menu button overlapped the top bars.

Still genuinely needs a **real device** pass:
- **Ritual visuals** — the charge fluid + destroy eye are WebGL; headless skips
  them (reduced-motion), so the effects themselves are unverified.
- A judgment call on swapping the dedicated Lino **button art**
  (`WritingButton.svg`, etc.) into the hub/landing vs. the current clean cards.
- Touch feel of the editor on a phone (basic touch confirmed; pinch-zoom/pan
  still unimplemented).

## Suggested next steps
1. Phone-test the loop (web + the native `apps/mobile` shell); tell me what reads wrong.
2. Drop a Mapbox token + confirm the `Place` decision → I build the map (the
   biggest remaining feature; votes are ready for it).
3. Hand me Stripe test keys → checkout + webhook → entitlements.

## Open questions logged in the docs
- Self-vote behavior now that real users exist (VotePanel) — keep or disallow.
- `Place` as a first-class model (map.md) — decide at map kickoff.
- Bake ring/glow into the rendered sigil image (currently CSS overlay).
- Anchored per-page tutorial steps (currently a centered intro).
