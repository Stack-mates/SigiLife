# M1 Plan — Auth + Profile

**Spec:** [../features/auth.md](../features/auth.md) ·
**Exit:** a fresh Google account can sign in → onboard → /home themed →
sign out → return. All acceptance criteria in the feature doc checked.

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
