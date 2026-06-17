# Feature: Auth & Onboarding

**Milestone:** M1 · **Status: implemented 2026-06-17** (ADR-016 — now the
keystone, not last). Auth.js v5, Google provider, **JWT sessions** (one token
serves web cookies + the mobile `Bearer` path via `/api/auth/mobile`).
`requireViewer()` resolves cookie → Bearer → dev-fallback; the dev-identity
shim stays active until `AUTH_ENFORCED=true` (prod), so local dev + E2E run
credential-less. Onboarding + enforced gate live in `(app)/layout`. Verified
to Google's consent screen; the final account-grant is the human's click.
Next: flip `AUTH_ENFORCED` in prod, native OAuth clients, retire the dev shim.

## Purpose
Google sign-in via Auth.js, then a one-time profile setup (username, avatar,
home location, theme). `User.username != null` is the "onboarded" signal.

## User stories
- As a new user I sign in with Google and am taken to create-profile.
- As a new user I pick a unique username, an avatar, my home town, and a theme.
- As a returning user I land on /home with my theme already applied.
- As any user I can sign out from the menu, and update profile bits in settings.

## Components & routes
- `app/page.tsx` (landing) + `components/auth/GoogleSignInButton`
- `app/(auth)/create-profile/page.tsx` + `components/auth/ProfileForm`
- `app/(app)/layout.tsx` — the session gate (redirects: no session → `/`;
  session but no username → `/create-profile`)
- `app/(app)/grimoire/settings/page.tsx`
- `lib/auth.ts` (Auth.js config), `context/UserProvider.tsx` (theme application)

## API / data
- `/api/auth/[...nextauth]` — Auth.js managed.
- `PATCH /api/users/[id]` — profile fields (username uniqueness → `CONFLICT`).
- Models: User, Account, Session (see DATA_MODEL.md).

## v1 reference (`main`)
`src/components/LogInAuth/*` (LandingPage carousel copy, CreateProfile form
fields, avatar options), `server/routes/auth.routes.ts`.

## Acceptance criteria
- [ ] Fresh Google account → onboarded → /home in under a minute.
- [ ] Username collision shows inline error, not a crash.
- [ ] Session gate covers every `(app)` route server-side.
- [ ] Theme (foliage/cyber × light/dark) applies before first paint (no flash).

## Open questions
- Username change after onboarding: allowed in settings, or immutable? (v1 allowed edits)
- Account deletion UX (DELETE endpoint exists) — confirm flow + copy.
