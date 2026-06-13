# Overnight session — 2026-06-13

Autonomous work while you slept. Everything below is committed and pushed to
`rebuild/nextjs-scaffold`. The dev server is running for phone testing at
**http://192.168.1.200:3001**.

## What I built (6 commits, all build/lint/typecheck/test clean)

1. **Home hub "The Office"** (`/home`) — the front door: Write / Charge /
   Destroy / Grimoire. Charge & Destroy route through the library in "pick
   mode" so you choose which sigil the ritual acts on.
2. **Library pick-mode** — `?pick=charge|destroy` turns the library into a
   chooser that routes thumbnails to the ritual pages.
3. **Profile page** (`/grimoire/profile`) — stats from the local store
   (crafted / active / charged / closed). Grimoire ribbons now include
   Profile and Settings.
4. **Settings page** (`/grimoire/settings`) — local-first and honest: a
   working "clear local sigils" maintenance tool (handy for testing),
   device sigil count, and "Replay introduction".
5. **Landing page** (`/`) — real pitch + logo + "Enter the Office".
6. **Tutorial intro (M6)** — Harper & Bennet greet you on your first `/home`
   visit and walk through the loop; completion persists locally; Skip always
   available; replay from Settings.

The whole loop is now connected end to end: land → enter → (tutorial) → hub →
write/draw/style → keep → library → charge/destroy → closed cases → profile.

I smoke-tested every route against a production build — all 200 (or expected
307 redirects), zero server errors, vectors API works.

## ⚠ Needs your eyes (built without visual verification)

I can't see the screens overnight, so I kept layouts clean/simple and
default-safe, but these want a real-device pass:

- **Tutorial overlay** — portrait sizing + the mobile bottom-sheet layout.
  It's a *centered* intro, not anchored-to-elements coaching (that's a
  deliberate scope call — see below).
- **Home hub & landing** — I used clean labeled cards on faint Lino
  backgrounds rather than the dedicated button art (`WritingButton.svg`,
  `GrimoireButton.svg`, etc.), because I couldn't judge how that art reads.
  Swapping it in is easy once you've looked.
- General spacing/scale of the new pages on a phone.

## Deliberate scope calls (documented as ADRs / plan notes)

- **No sweeping theme system.** A full foliage/cyber × light/dark palette
  needs your eyes + a component-token retrofit across every surface — too
  risky to generate blind. Settings is honest that theming arrives with
  accounts. (Groundwork only.)
- **Tutorial is a centered intro, not anchored spotlight.** Spotlight cutouts
  need pixel-accurate positioning I can't verify unseen. Anchored per-page
  steps are a documented follow-up in `docs/plans/M6-tutorial.md`.

## Blocked on you / credentials (left as plans, not half-builds)

- **Map + votes (M4)** — needs a `NEXT_PUBLIC_MAPBOX_TOKEN` and your call on
  the first-class `Place` model (see `docs/features/map.md`). Votes also need
  the DB.
- **Monetization (M7)** — needs Stripe keys.
- **Auth + database** — you wanted Google auth last (ADR-009); the DB also
  needs a `DATABASE_URL` (Postgres). When you're ready, `docs/plans/M1-auth.md`
  is the task list. Everything is local-first behind `lib/sigil/localStore.ts`,
  which is the seam: its callers swap to API calls with the same shapes.

## Suggested next steps when you're back

1. Phone-test the new flow; tell me what reads wrong and I'll fix.
2. Decide on the `Place` model + drop a Mapbox token → I can build the map.
3. When ready for persistence, hand me a Postgres URL and I'll do the DB
   milestone (auth can still come last via a dev-identity shim).

A global nav Menu (to jump back to The Office from deep pages) is the one
small gap I deliberately left — say the word and I'll add it.
