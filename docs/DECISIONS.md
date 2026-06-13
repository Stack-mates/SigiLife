# DECISIONS — Architecture Decision Records

Append-only log. New deps, infra choices, or reversals get an entry.
Format: number, date, decision, why, alternatives considered.

---

## ADR-001 · 2026-06-11 · Next.js full-stack (App Router)
**Decision:** Rebuild as a single Next.js app; route handlers replace the
separate Express server.
**Why:** One deployable, one TS config, server components cut client JS for
the book/library pages, first-class Vercel deploys for a 2-person team that
wants to ship and charge money, good docs for AI-assisted work.
**Alternatives:** Keep Vite+Express (familiar but two apps to deploy/secure);
Remix (smaller ecosystem).

## ADR-002 · 2026-06-11 · Postgres (was MySQL/MariaDB)
**Decision:** Postgres via Prisma.
**Why:** Better managed free tiers (Neon/Supabase) for staging+prod, native
Json columns for canvasData/homeLocation, Prisma support is first-class.
**Alternatives:** Keep MySQL (no carry-over benefit — data is not being
migrated; v1 DB was throwaway bootcamp data).

## ADR-003 · 2026-06-11 · Auth.js (NextAuth v5) replaces hand-rolled OAuth + express-session
**Decision:** Auth.js with Google provider + Prisma adapter.
**Why:** v1 hand-verified Google tokens and ran a MySQL session store —
~300 lines of security-sensitive code we no longer maintain. Auth.js gives
sessions, CSRF, account linking, and future providers (Apple) for free.
**Alternatives:** Clerk/Supabase Auth (vendor lock + cost), keep hand-rolled (no).

## ADR-004 · 2026-06-11 · Rebuild in-repo on a branch; v1 preserved on `main`
**Decision:** Clear the working tree on `rebuild/nextjs-scaffold`; keep all
v1 code reachable via `git show main:<path>`. Keep the Lino art
(`public/art/`), fonts, and 8th Wall engine (`public/xr/`,
`vendor/xr-standalone.zip`) in the tree — they are the reusable IP.
**Why:** One repo, one history, the old implementation stays a first-class
reference for business logic without polluting the new tree.

## ADR-005 · 2026-06-11 · Stripe for monetization
**Decision:** Stripe Checkout + webhook-synced `Subscription` →
`Entitlement` rows; app logic reads entitlements only
(`lib/entitlements.ts`).
**Why:** Standard, test-mode friendly, and the entitlement indirection lets
us grant perks (promo, founder accounts) without faking subscriptions.
**Alternatives:** LemonSqueezy/Paddle (merchant-of-record is appealing for
tax — revisit if EU sales materialize; entitlement layer makes a swap cheap).

## ADR-006 · 2026-06-11 · Defer heavy client deps to their milestones
**Decision:** fabric, mapbox-gl, react-map-gl, ogl, stripe are NOT installed
in M0. Stubs may not import them.
**Why:** Keeps the scaffold installable/buildable fast and forces each
milestone to start with a conscious dependency decision.

## ADR-007 · 2026-06-11 · 8th Wall open-source transition; drop vendored zip
**Decision:** M8 AR will use the **Distributed Engine Binary**
(`@8thwall/engine-binary` from npm / github.com/8thwall/engine), pinned at
implementation time. `vendor/xr-standalone.zip` was deleted — it turned out
to be a corrupt download (saved HTML of the GitHub repo page, not an
archive), and the artifact is now reproducible from npm/GitHub anyway.
`public/xr/` stays as a reference snapshot until M8 replaces it with the
pinned npm version.
**Why:** Niantic retired the hosted 8th Wall platform on 2026-02-28 and
released the tech in two forms: an MIT framework (no SLAM) and a binary-only
limited-use engine WITH SLAM, free for commercial use as part of a broader
app. SigiLife needs SLAM, qualifies as a broader app, and needs no API keys
under the new model. Obligations: keep Niantic attribution visible; never
sell AR as a standalone product. Full analysis: docs/features/ar.md.
**Alternatives:** MIT framework only (no SLAM — can't do surface
placement); WebXR (free, but narrower iOS support — remains the fallback
if the community binary stagnates; also note the separate 8thwall.io
community fork).

## ADR-008 · 2026-06-12 · Runtime glyph tracing replaces SvgVector seeding
**Decision:** `POST /api/vectors` traces glyph outlines at request time with
`opentype.js` from `public/fonts/UncialAntiqua-Regular.ttf` (verified: full
coverage incl. accented consonants and symbols, 371 glyphs). The `SvgVector`
table and seed script are removed. Installed: `fabric` (editor),
`opentype.js` (+types), `vitest` (dev).
**Why:** The intention rules now keep accented letters and symbols — a
pre-seeded a–z table can't serve that; the font itself is the source of
truth for any glyph. Also removes the DB dependency from the creation flow
entirely, enabling ADR-009's sequencing.
**Alternatives:** seed every glyph (brittle, 371 rows, still misses future
fonts); client-side tracing (ships the parser + font to every browser).

## ADR-009 · 2026-06-12 · Sigil creation first; Google auth + DB land last
**Decision:** Build the make-sigil flow now with no auth/DB; drafts persist
locally (sessionStorage/localStorage). Google OAuth + Postgres move to the
END of the build order. When user-owned features need an identity before
then, use a dev-identity shim behind the same `lib/auth.ts` interface so
swapping in real auth is config, not refactor.
**Why:** The differentiated, risky work (editor, rituals) should de-risk
first; auth is commodity work with a fixed contract (session shape is
already specified in docs/features/auth.md). Caveat recorded: the DB cannot
wait as long as OAuth — votes/social/library persistence need Postgres
well before launch; only the identity provider is "absolutely last."
**Alternatives:** roadmap order as planned (M1 first — rejected by team
preference); mock the whole API (more scaffolding than value).

## ADR-011 · 2026-06-13 · Drop GhostCursor from the destroy ritual (avoids three.js)
**Decision:** Omit v1's GhostCursor. EvilEye (ogl), with its pupil tracking
the user's pointer/touch, is the destroy ceremony's centerpiece; a completion
meter drives the flow. GhostCursor stays unported.
**Why:** v1's GhostCursor imports the full `three` package plus
EffectComposer/UnrealBloom postprocessing — ~600KB+ for a secondary cursor
trail, against our lean-deps discipline (ADR-006). EvilEye alone is a strong,
coherent ritual.
**Alternatives:** add three.js (rejected — disproportionate); reimplement the
trail in raw WebGL (possible later polish if the ritual wants more motion).

## ADR-010 · 2026-06-13 · Install `ogl` for the destroy ritual (EvilEye)
**Decision:** Add `ogl` (M5). It's the minimal WebGL layer v1's EvilEye is
built on; porting verbatim keeps the shader intact. SplashCursor and
GhostCursor are raw WebGL and need no dependency.
**Why:** Rewriting the eye shader against raw WebGL would be pure risk for
zero benefit — the v1 implementation works.
**Alternatives:** three.js (heavier, already avoided); hand-rolled WebGL
(needless reimplementation).

---

### Template

```
## ADR-NNN · YYYY-MM-DD · <title>
**Decision:**
**Why:**
**Alternatives:**
```
