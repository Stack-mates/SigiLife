# Implementation Plan — Phase Overview (M1–M8)

> **Re-sequenced 2026-06-12 (ADR-009):** auth + DB (M1) moved to the END of
> the build; M2's creation flow shipped first with local persistence and a
> dev-identity shim planned for user-owned features in between. Read "M1"
> below as "the final milestone"; M2 core is done.

How this directory works: this file is the standing overview of all phases.
Detailed task plans live alongside it (`M1-auth.md`, `M2-make-sigil.md`, …)
and are written **just-in-time** — at most one milestone ahead of current
work — using `TEMPLATE.md`. Detail planned further out than that goes stale
as decisions land. Currently detailed: **M1, M2**.

Definition-of-done per phase lives in [../ROADMAP.md](../ROADMAP.md);
acceptance criteria live in each feature doc. This overview adds the *why
this order*, dependencies, risks, and the decisions each phase must make.

---

## M1 · Auth + Profile — *the foundation everything sits on*
**Goal:** a real user can sign in with Google, onboard, and exist in the DB.
**Delivers:** first Prisma migration, `lib/prisma` + `lib/auth` wired,
session gate in `(app)/layout`, create-profile flow, settings, theme system
live in `globals.css` (foliage/cyber × light/dark), Menu + sign-out.
**Depends on:** a provisioned Postgres + Google OAuth credentials (the only
phase with setup outside the repo).
**Risks/decisions:** username mutability; Auth.js v5 session callback shape
(get `user.id`/`username` into the session early — everything downstream
reads it).
**Why first:** every other phase needs a session and a User row.
→ Detailed tasks: [M1-auth.md](M1-auth.md)

## M2 · Make Sigil — *the core product loop, part 1 (create)*
**Goal:** a user can write an intention, draw, style, and save a sigil.
**Delivers:** consonant extraction (+ first unit tests / Vitest setup),
SvgVector seeding from fonts, vectors API, the three-step wizard with
MakeSigilProvider, Fabric.js canvas (port of v1's draw/manipulate/history),
save with profanity filter + slot check, basic SlotMeter.
**Depends on:** M1 (session, DB). Installs: `fabric`, `opentype.js` (seed),
`vitest` — each with an ADR note.
**Risks/decisions:** Fabric v7 + React 19 integration (v1 proves it works —
port, don't rewrite); intention max length; touch drawing quality on phones
(this phase sets the mobile-first bar).
**Why second:** highest-value, highest-unknown feature; everything after it
displays or acts on sigils, so sigils must exist first.
→ Detailed tasks: [M2-make-sigil.md](M2-make-sigil.md)

## M3 · Grimoire + Library — *manage what you made*
**Goal:** full read/manage lifecycle of your own sigils.
**Delivers:** book shell + spread layout, library grid (+ pick-mode routing
from The Office, + "completed" view of destroyed sigils), sigil detail page,
rename, destroy-as-status-flip (placeholder ritual — just confirm + API),
share endpoint + SigiLites display, follows (UserSearch/FriendsList/
FollowButton — the social plumbing lands here so sharing works).
**Depends on:** M2 (sigils exist). No new heavy deps.
**Risks/decisions:** book layout responsive strategy (portrait stack vs
landscape spread) — settle early, every grimoire page inherits it;
destroyed-view naming ("Closed cases"?).
**Why third:** cheap CRUD that makes M2's output visible and testable daily.

## M4 · Map + Votes — *the shared world*
**Goal:** sigils visible and votable on the global map; placement flow.
**Delivers:** WorldMap (view + place modes), SigilMarker, MapSearchBox
(also retrofits ProfileForm home-location and StyleSigil location fields),
vote endpoint with transactional toggle + VotePanel, place-sigil page.
**Depends on:** M3 (sigil pages to link back to). Installs: `mapbox-gl`,
`react-map-gl`, search-js (ADR).
**Risks/decisions:** marker scale strategy (clustering threshold); Mapbox
free-tier limits once public; map style matching the Lino aesthetic.
**Why fourth:** needs a body of sigils to be meaningful; votes need other
users to matter — fine to land before social polish since votes also work
on your own test accounts.

## M5 · Rituals — *the magic (charge/destroy ceremonies)*
**Goal:** the charge and destroy pages stop being placeholders and feel good.
**Delivers:** EmotionPicker, SplashCursor fluid sim (port), EvilEye OGL port
(+ unmount cleanup v1 lacked), GhostCursor, explicit ritual completion
(not blind timers), chargedEmotion persistence. Installs: `ogl` (ADR).
**Risks/decisions:** 60fps on mid-range phones is the acceptance bar —
degrade particles, not framerate; reduced-motion fallbacks; whether
re-charging overwrites emotion (feature doc leans yes).
**Why fifth:** pure polish on flows that already function (M3 ships the
mechanical versions) — highest craft risk, zero schema risk, safe to
iterate on while M4 stabilizes.

## M6 · Tutorial — *onboarding, once the screens are stable*
**Goal:** Harper & Bennet guide a new user through their first sigil.
**Delivers:** tutorialScript data (port v1 writing), TutorialOverlay engine
(anchor spotlight, phone-safe bubbles, always-visible skip), TutorialProvider
with server-persisted completion, dynamic import so completed users pay zero
bundle cost, replay from settings.
**Depends on:** M1–M5 screens settled (the script anchors to real UI).
**Risks/decisions:** final step inventory; anchor selectors are brittle —
add stable data-tutorial attributes as part of this phase.
**Why sixth:** writing a tutorial against moving screens is wasted work.

## M7 · Monetization — *the launch gate*
**Goal:** a test-mode user buys Premium and their slots increase, no manual steps.
**Delivers:** Stripe checkout + idempotent webhook, Subscription→Entitlement
sync, full `lib/entitlements` (replacing M2's flat 12), premium page +
UpgradeCard + PaywallGate, founder GRANT entitlements, lapse behavior
(extra sigils lock, never delete). Installs: `stripe` (ADR).
**Depends on:** M2's slot enforcement point (already routes through
lib/entitlements); pricing decisions (research comps before this phase).
**Risks/decisions:** price points, trial/no-trial, yearly discount;
webhook idempotency is the only genuinely tricky code.
**Why seventh:** monetizing before the loop is delightful (M5) and
learnable (M6) would charge money for an unfinished product.
**Launch = end of M7.**

## M8 · AR — *post-launch*
**Goal:** place a sigil on a real surface and revisit it.
**Delivers:** ArViewer over the pinned `@8thwall/engine-binary` (ADR-007),
placements API, flag/admin gate, Niantic attribution, graceful unsupported
fallback. Replaces the v1-era `public/xr` snapshot with the pinned npm version.
**Depends on:** launch stability; re-check community-fork health
(8thwall.org vs 8thwall.io lineages) at kickoff.
**Risks/decisions:** engine delivery (self-host vs CDN — lean self-host);
AR premium-only?; device support matrix.
**Why last:** coolest, least essential, and the ecosystem (newly
community-run) benefits from a few more months of settling.

---

## Cross-phase rules (from CLAUDE.md, repeated because they bite here)
- Each phase starts by resolving its feature doc's **open questions** —
  answers get written into the doc, decisions into DECISIONS.md.
- Heavy deps install at their phase, never earlier (ADR-006).
- Every phase ends with: stub STATUS lines flipped, COMPONENT_MAP /
  API_CONTRACT updated, ROADMAP status column updated, and the next
  phase's detailed plan written from TEMPLATE.md.
