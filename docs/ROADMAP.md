# ROADMAP

Milestones are sequential; a milestone is "done" when its definition of done
passes and its feature doc's acceptance criteria are met. Update the status
column as work lands.

**Re-sequenced 2026-06-12 (ADR-009):** Google auth + DB move to the END of
the build order; the creation flow shipped first with local-only persistence.
M2's client side is largely done; M1 is now effectively the FINAL milestone
(rename pending — treat "M1" rows below as "auth milestone, last").

Phase-by-phase overview (dependencies, risks, why-this-order):
[plans/OVERVIEW.md](plans/OVERVIEW.md). Detailed task plans are written
just-in-time, one milestone ahead: [plans/M1-auth.md](plans/M1-auth.md),
[plans/M2-make-sigil.md](plans/M2-make-sigil.md), then from
[plans/TEMPLATE.md](plans/TEMPLATE.md) as each milestone wraps.

| M | Name | Scope | Definition of done | Status |
|---|---|---|---|---|
| M0 | Scaffold | This branch: docs + stub tree + prisma draft | `build`/`lint`/`typecheck` pass; PR merged | **in progress** |
| DB | Persistence | Postgres + Prisma, server-action data layer (lib/sigil/actions) replacing localStore, dev-identity shim | Sigils persist in the database across reloads/devices | **done 2026-06-14** (split out of M1 ahead of auth) |
| M1 | Auth + profile | Auth.js Google login (JWT sessions, web + mobile Bearer), create-profile, settings, session gate, theming | New user can sign in, onboard, pick theme, sign out, return | **Real Google auth wired 2026-06-17** (ADR-016, now the keystone not "last"): Auth.js JWT sessions, `[...nextauth]` + `/api/auth/mobile` token exchange, `requireViewer` cookie/Bearer/dev-fallback, GoogleSignInButton, landing sign-in, Menu sign-out, the onboarding + enforced-gate in (app)/layout. **Dev-identity fallback preserved** (gate enforced only when `AUTH_ENFORCED=true`) so local dev + E2E stay green. Verified end-to-end to Google's consent screen; the final account-grant + callback is the human's to click. Profile + theming landed 2026-06-15. |
| M2 | Make sigil | write→draw→style wizard, character extraction (consonants+symbols), single-canvas Fabric editor, runtime glyph tracing (ADR-008), local keep + PNG. Installed: fabric, opentype.js, vitest. | A user can create a sigil end-to-end | **core done 2026-06-12** (server save → auth milestone) |
| M3 | Grimoire + library | Book shell (ribbon tabs), library grid + Closed cases view, sigil page, rename, destroy (status flip) — local-first over lib/sigil/localStore | Full read/manage lifecycle of own sigils | **core done 2026-06-12**; social/profile API + UI landed 2026-06-15; **grimoire finished 2026-06-17**: default `/grimoire` spread (LeftPage+RightPage) mounted, ribbon links all live surfaces (no "soon" tabs), `/grimoire/profile` now DB-backed, and the scrying feed (`SharedWithMe`, read side of SigilShare) is live on /grimoire/friends via `lib/user/actions`. |
| M4 | Map + votes | WorldMap (view + place modes), SigilMarker, MapSearchBox, GET /api/sigils (scoped), PATCH /api/sigils/[id] (location), place-sigil page. Installed: mapbox-gl, react-map-gl. ADR-013: no Place model (raw lat/lng on Sigil). | Sigils visible/votable on the global map | **done 2026-06-14** |
| M5 | Rituals | Charge + destroy ritual pages, emotion picker (5 canonical), SplashCursor fluid sim, EvilEye. Installed: ogl. GhostCursor dropped (ADR-011). | Rituals feel good on a phone; charge sets emotion; destroy → Closed cases | **done 2026-06-13** (local-first) |
| M6 | Tutorial | Harper/Bennet first-run intro overlay on /home, completion persisted locally, replay in Settings | First-time flow introduces the loop | **intro done 2026-06-13** (anchored per-page steps deferred) |
| M7 | Monetization | Stripe checkout + idempotent webhook, Subscription/Entitlement sync, lib/entitlements (getSlotLimit/canCreateSigil/hasPremiumStyles), premium page, UpgradeCard, PaywallGate, SlotMeter. Installed: stripe. | A test-mode user can buy premium and gain slots | **implemented 2026-06-14** (needs real Stripe keys + price IDs to go live) |
| M8 | AR (post-launch) | 8th Wall ArViewer, placements API, flag gate | Admin can place + revisit a sigil in AR | |

**Launch target = end of M7.** M8 is explicitly post-launch.

## Working order within a milestone

1. Read the feature doc; resolve its open questions (record answers there).
2. Implement lib/ logic first (testable), then API routes, then UI.
3. Flip stub STATUS lines; update COMPONENT_MAP/API_CONTRACT as you go.
4. PR per coherent slice, not per milestone.
