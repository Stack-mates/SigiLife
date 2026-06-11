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

---

### Template

```
## ADR-NNN · YYYY-MM-DD · <title>
**Decision:**
**Why:**
**Alternatives:**
```
