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
| M1 | Auth + profile | Auth.js Google login, create-profile, settings, session gate, theming live | New user can sign in, onboard, pick theme, sign out, return | |
| M2 | Make sigil | write→draw→style wizard, character extraction (consonants+symbols), single-canvas Fabric editor, runtime glyph tracing (ADR-008), local keep + PNG. Installed: fabric, opentype.js, vitest. | A user can create a sigil end-to-end | **core done 2026-06-12** (server save → auth milestone) |
| M3 | Grimoire + library | Book shell (ribbon tabs), library grid + Closed cases view, sigil page, rename, destroy (status flip) — local-first over lib/sigil/localStore | Full read/manage lifecycle of own sigils | **core done 2026-06-12** (social/profile/map → DB era) |
| M4 | Map + votes | WorldMap, placement, place-sigil flow, vote endpoint + VotePanel. Install: mapbox-gl, react-map-gl, @mapbox/search-js-react. | Sigils visible/votable on the global map | |
| M5 | Rituals | Charge + destroy ritual pages, emotion picker, SplashCursor fluid sim, EvilEye. Install: ogl. | Rituals feel good on a phone; charge sets emotion; destroy frees slot | |
| M6 | Tutorial | Harper/Bennet overlay engine across M1–M5 screens, hasCompletedTutorial persistence | First-time flow guides a new user through their first sigil | |
| M7 | Monetization | Stripe checkout + webhook, Subscription/Entitlement sync, premium page, PaywallGate, slot enforcement from entitlements. Install: stripe. | A test-mode user can buy premium and gain slots | |
| M8 | AR (post-launch) | 8th Wall ArViewer, placements API, flag gate | Admin can place + revisit a sigil in AR | |

**Launch target = end of M7.** M8 is explicitly post-launch.

## Working order within a milestone

1. Read the feature doc; resolve its open questions (record answers there).
2. Implement lib/ logic first (testable), then API routes, then UI.
3. Flip stub STATUS lines; update COMPONENT_MAP/API_CONTRACT as you go.
4. PR per coherent slice, not per milestone.
