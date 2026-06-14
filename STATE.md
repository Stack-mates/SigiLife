# STATE — where SigiLife stands (2026-06-14)

Living status doc. Branch: `rebuild/nextjs-scaffold` (all work pushed).
Run it: `docker compose up -d db && npm run dev`. Verify: `npm run test`
(unit) and `npm run test:e2e` (browser).

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
  Cloudflare Tunnel, ADR-012) — not Vercel.
- **Postgres + Prisma**, server-action data layer (`lib/sigil/actions.ts`).
  Identity is a **dev-shim** (`lib/auth.ts`) — one stand-in user owns
  everything until Google auth; only that function changes when auth lands.
- **Tests:** Vitest unit (12) + Playwright E2E (8). Both green.
- Docs: full set in `docs/` (specs, ADRs 001–012, per-milestone plans).

## ⛔ Blocked — each needs ONE thing from you

| Feature | Blocked on | When unblocked |
|---|---|---|
| **Map** (place sigils, see the shared world) | a free **Mapbox token** (`NEXT_PUBLIC_MAPBOX_TOKEN`) + the `Place`-model decision (lean: yes) | I build WorldMap/markers/placement; VotePanel already plugs in |
| **Monetization** | **Stripe** keys (test mode is fine to start) | I build checkout + webhook → entitlements (schema already there) |
| **Google auth / accounts** | a **Google OAuth client** (id + secret) + your go-ahead (you wanted this last) | I swap the dev-shim in `lib/auth.ts` for Auth.js; multi-user makes votes/sharing real |
| **AR** (8th Wall) | post-launch decision | scaffolded; revisit after launch (ADR-007) |

I did **not** fake any of these credentials or build their UIs blind.

## Visual state — reviewed via screenshots (2026-06-14)

Correction to earlier notes: I *can* see the UI — `scripts/screenshots.mjs`
captures pages to PNGs that an image-capable read tool views. I did a phone-
viewport pass over landing, home + tutorial overlay, write step, library,
sigil page, profile, settings. They render cleanly and cohesively (Lino
portraits/avatar, sigil ring+glow, charged badge, vote panel all correct).
Found and **fixed** one bug: the nav menu button overlapped the top bars
(wizard steps / grimoire ribbons).

Still genuinely needs a **real device**:
- **Ritual visuals** — the charge fluid + destroy eye are WebGL; headless
  skips them (reduced-motion), so the effects themselves are unverified.
- A judgment call on swapping the dedicated Lino **button art**
  (`WritingButton.svg`, etc.) into the hub/landing vs. the current clean cards.
- Touch feel of the editor on a phone (the earlier pass confirmed basic touch;
  pinch-zoom/pan still unimplemented).

## Suggested next steps
1. Phone-test the loop + the above surfaces; tell me what reads wrong.
2. Drop a Mapbox token + confirm the `Place` decision → I build the map (the
   biggest remaining feature; votes are ready for it).
3. When you want persistence for real users, hand me Google OAuth creds and
   I'll do the auth milestone (swaps one shim function).

## Open questions logged in the docs
- Self-vote behavior once there are real users (VotePanel) — keep or disallow.
- `Place` as a first-class model (map.md) — decide at map kickoff.
- Bake ring/glow into the rendered sigil image (currently CSS overlay).
- Anchored per-page tutorial steps (currently a centered intro).
