# M1 Plan — Auth + Profile

**Spec:** [../features/auth.md](../features/auth.md) ·
**Exit:** a fresh Google account can sign in → onboard → /home themed →
sign out → return. All acceptance criteria in the feature doc checked.

> **UPDATE 2026-06-17 — auth is now the keystone, and token-based.**
> Two things changed since this plan was written:
>
> **(a) Much of M1 already landed against the dev shim** (overnight build,
> 2026-06-15): `lib/prisma`, the init migration, `lib/validation`
> (updateUserSchema etc.), `lib/api` (requireViewer + parse), `ProfileForm`,
> `/create-profile`, the theme system in `globals.css` + `UserProvider` (live
> foliage/cyber × light/dark), `Menu`, `getCurrentUser`, and the user/profile
> API routes. **What's NOT done = the actual identity provider:** real
> Auth.js Google wiring in `lib/auth.ts`, the `[...nextauth]` route,
> `GoogleSignInButton`, the session gate in `(app)/layout`, and `signOut`.
>
> **(b) Mobile pivot (ADR-016) makes sessions token-based.** Native apps can't
> ride Next-Auth cookies, so the session must be a **JWT** the API accepts as
> either a cookie (web) or a `Bearer` token (mobile). Decision: **Auth.js
> with `session: { strategy: "jwt" }`**, Google provider; mobile does native
> Google sign-in → posts the Google ID token to a backend endpoint → backend
> verifies and returns the same JWT. `requireViewer()` resolves the user from
> cookie-or-Bearer, falling back to the dev shim **only** when no real auth is
> configured (so local dev keeps working credential-less).
>
> **The one external dependency (blocks the Google path end-to-end):**
> Google OAuth credentials — see Prerequisites. Everything else (the token
> layer, the API-as-source-of-truth migration, the dev fallback) can be built
> and tested without them; the Google provider activates when the env vars land.
> Revised task order lives in the "Revised tasks (2026-06-17)" section below.

## Open questions to resolve FIRST (write answers into auth.md)
- [ ] Username mutability after onboarding (proposal: allowed in settings,
      rate-limited to once per 30 days — cheap to enforce later, decide copy now)
- [ ] Account deletion confirm UX (proposal: type username to confirm)

## Prerequisites (one-time, outside the repo — split between you two)
- [ ] Provision Postgres (Neon free tier recommended; one branch/db per dev
      + one shared staging later)
- [ ] Google Cloud OAuth client (authorized origins: localhost:3000 +
      future prod domain) → AUTH_GOOGLE_ID/SECRET
- [ ] Each dev: `.env.local` from `.env.example`; `npx auth secret` for AUTH_SECRET

## Tasks (ordered; ✎ = updates a doc in the same PR)

### PR 1 — database + auth core
1. `lib/prisma.ts` — implement the singleton (pattern is in the stub comment).
2. First migration: `npm run db:migrate` → `init` migration committed.
   ✎ none (schema unchanged — migration only).
3. `lib/auth.ts` — NextAuth v5: PrismaAdapter, Google provider, database
   sessions, callbacks exposing `session.user.{id, username, isAdmin, theme,
   colorTheme, hasCompletedTutorial}`. Augment types in `types/next-auth.d.ts`.
4. `app/api/auth/[...nextauth]/route.ts` — replace stub with
   `export const { GET, POST } = handlers`. ✎ API_CONTRACT row → live.
5. `lib/api.ts` — add `requireSession()` and the zod→VALIDATION helper
   promised in its comment block.
6. Smoke: sign in with a real Google account, see User+Account+Session rows
   in `npm run db:studio`.

### PR 2 — gate, onboarding, theming
7. `app/page.tsx` (landing) — session redirect logic + pitch +
   `<GoogleSignInButton>` (implement component: `signIn("google")`).
8. `app/(app)/layout.tsx` — the gate: no session → `/`; no username →
   `/create-profile`. ✎ flip STATUS.
9. `lib/validation` — `updateUserSchema` (zod).
10. `app/api/users/[id]/route.ts` — implement PATCH (self-only, username
    CONFLICT on unique violation). GET/DELETE can stay 501 until task 13.
    ✎ API_CONTRACT.
11. `app/globals.css` — port the theme system from `main:src/index.css`:
    CSS vars, `.dark`/`.theme-foliage`/`.theme-cyber`, glasscard/buttons.
    `context/UserProvider.tsx` — apply classes from the session user (server
    sets initial class on `<html>` in root layout to avoid flash) + `useUser()`.
12. `(auth)/create-profile/page.tsx` + `components/auth/ProfileForm.tsx` —
    username, avatar picker (public avatars), home location (text field
    until M4), theme toggles w/ live preview → PATCH → `/home`.
    ✎ flip STATUS lines, COMPONENT_MAP if tree changed.

### PR 3 — chrome + settings
13. `components/layout/Menu.tsx` — nav + `signOut()`.
14. `grimoire/settings/page.tsx` — reuse ProfileForm (mode="settings");
    implement DELETE /api/users/[id] + confirm flow. ✎ API_CONTRACT.
15. `app/(app)/home/page.tsx` — minimal real version: PageShell + Office art
    + the four hotspot links (targets exist as stubs). ✎ flip STATUS.

## Verification (beyond lint/typecheck/build)
- Fresh-account E2E on a phone browser: sign in → onboard → /home, theme
  applied without flash; sign out; sign back in lands on /home directly.
- Second account takes a colliding username → inline CONFLICT error.
- Hitting any /grimoire/* URL signed-out redirects to `/`.
- `git grep "STATUS: stub" app/(auth) app/api/auth lib/auth.ts` → empty.

## Done = ROADMAP M1 row checked, M3 plan NOT needed yet (M2 already written).

---

## Revised tasks (2026-06-17) — token-based, web + mobile, dev-fallback preserved

### Phase A — credential-INDEPENDENT (buildable + testable now, no Google creds)
A1. `lib/auth.ts` → configure Auth.js (`session.strategy = "jwt"`, Google
    provider reading env, PrismaAdapter). Keep a **dev-login fallback**:
    `requireViewer()` resolves from cookie-or-`Bearer` JWT, else the existing
    dev shim — so the app runs credential-less and activates real auth when
    `AUTH_GOOGLE_*` are present. ✎ types/next-auth.d.ts.
A2. `app/api/auth/[...nextauth]/route.ts` → `export const { GET, POST } = handlers`.
A3. API auth layer: a `Bearer`-token path in `requireViewer()` + a dev
    token-mint route (test-only, gated to non-prod) so the token model is
    exercisable before Google works. ✎ API_CONTRACT.
A4. **API-as-source-of-truth — DONE 2026-06-17.** All web write-paths now call
    the authenticated `/api/*` routes via a shared `lib/api-client.ts` (the
    seed of packages/api-client): create (StyleSigil → POST /api/sigils, which
    adds slot-check + profanity over the old action), charge/vote/destroy
    (rituals + VotePanel), rename (sigil page); follow/profile/location were
    already on the API. The now-redundant `keepSigil`/`renameSigil` server
    actions were removed so create/rename have a single implementation. Reads
    stay as RSC/server actions per plan. Verified: typecheck/lint/build + E2E
    loop (create→charge→vote→destroy) 8/8.
A5. Extract domain logic + schemas + types toward `packages/shared` boundaries
    (can be in-repo dirs now; physical monorepo split is the later step).

### Phase B — credential-DEPENDENT (needs Google OAuth creds to finish/test)
B1. `app/page.tsx` + `GoogleSignInButton` → real `signIn("google")`.
B2. `(app)/layout.tsx` gate: no session → `/`; no username → `/create-profile`.
B3. `Menu` → real `signOut()`; settings → DELETE account confirm.
B4. Mobile token exchange endpoint: native Google ID token → verified → JWT.
B5. Retire the dev shim's auto-user once real sessions exist (keep it behind a
    dev-only flag for local E2E).

### Verification additions
- Bearer-token request to a write endpoint succeeds with a valid JWT, 401s
  without — proving the mobile auth path before the mobile app exists.
