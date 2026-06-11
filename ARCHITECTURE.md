# ARCHITECTURE.md

## Stack

| Layer | Choice | Why (ADR) |
|---|---|---|
| Framework | Next.js (App Router, TypeScript) | ADR-001 — single deployable, server components, easy Vercel deploys |
| Database | Postgres via Prisma | ADR-002 — replaces v1 MySQL; better hosted options (Neon/Supabase) |
| Auth | Auth.js (NextAuth v5) + Google provider + Prisma adapter | ADR-003 — replaces hand-rolled OAuth + express-session |
| Styling | Tailwind CSS v4 + CSS theme variables | carried over from v1's visual system |
| Canvas | Fabric.js (deferred install — M2) | sigil drawing, proven in v1 |
| Maps | Mapbox GL + react-map-gl (deferred — M4) | global sigil map + geocoding |
| Ritual FX | OGL / WebGL shaders (deferred — M5) | charge fluid sim, destroy evil-eye |
| Payments | Stripe (deferred — M7) | ADR-005 — subscriptions + premium sigil slots |
| AR | 8th Wall engine in `public/xr` (deferred — M8) | place sigils in physical space |

"Deferred" deps are NOT in package.json yet — install them when their
milestone starts, with a DECISIONS.md note. Stubs must not import them.

## Directory layout

```
app/            routes (App Router). Pages are thin; logic lives in components/ and lib/
  (auth)/       logged-in but profile-incomplete flow (create-profile)
  (app)/        auth-gated app; (app)/layout.tsx enforces session + mounts Menu/Tutorial
  api/          REST route handlers — see docs/API_CONTRACT.md
components/     by feature area: layout/ auth/ sigil/ charge/ destroy/ map/
                grimoire/ social/ tutorial/ premium/ ar/ ui/
context/        client providers: UserProvider, TutorialProvider, MakeSigilProvider
lib/            server + shared logic: prisma, auth, stripe, mapbox, entitlements,
                sigil/ (consonant extraction, vector seeding), validation/ (zod)
prisma/         schema.prisma + seed
types/          shared TS types, 8thwall.d.ts
docs/           the documentation set (see README index)
public/art/     hand-made Lino-style SVG art from v1 (the visual identity)
public/xr/      8th Wall engine binaries (WASM) — do not lint/modify
vendor/         xr-standalone.zip reference bundle
```

## Request flows

**Server-rendered read** (library, profile, sigil page):

```
browser → app/(app)/grimoire/library/page.tsx (server component)
        → lib/auth.ts getSession() → prisma query → render
```

**Client mutation** (vote, save sigil, follow):

```
client component → fetch /api/sigils/[id]/vote
   route handler: zod-validate body → auth() session check
   → prisma transaction (upsert vote + recompute scores)
   → JSON response { data } | { error: { code, message } }
```

**Auth**:

```
/ (landing) → Auth.js Google sign-in → callback
  → if user.username is null → redirect /create-profile
  → else → /home
(app)/layout.tsx re-checks session on every app page (server-side)
```

## Route groups

- `(auth)` — signed in, profile not yet complete. Only `create-profile`.
- `(app)` — fully onboarded. Its `layout.tsx` is the single auth gate
  (replaces v1's `ProtectedRoute` component) and mounts the global Menu and
  tutorial overlay.
- Landing (`app/page.tsx`) is public and redirects signed-in users to `/home`.

## Client/server boundaries

Default is **server component**. These pages are inherently client-heavy and
may be client components at the page level:

- `make-sigil/draw` — Fabric.js canvas
- `charge-sigil/[sigilId]` & `destroy-sigil/[sigilId]` — WebGL rituals
- `grimoire/map` & `place-sigil/[sigilId]` — Mapbox GL
- `ar/[sigilId]` — 8th Wall

Everything else: server page, `"use client"` only on interactive leaves
(buttons, forms, pickers).

## State

- **Server is the source of truth.** No client cache layer in v1 of the
  rebuild; pages refetch via router refresh after mutations.
- `UserProvider` — session user + theme application (sets `.dark` and
  `.theme-foliage`/`.theme-cyber` classes on `<html>`).
- `MakeSigilProvider` — the in-progress sigil draft (intention, consonants,
  canvas JSON) across the write→draw→style wizard. Replaces v1's
  localStorage juggling. Lives in `make-sigil/layout.tsx`.
- `TutorialProvider` — tutorial step state, persisted to `User.hasCompletedTutorial`.

## Theming

Carried from v1: two color themes (`foliage` green / `cyber` blue) × two
modes (light/dark), driven by CSS variables (`--theme-text`, `--theme-glow`)
and classes on `<html>`. Defined in `app/globals.css`. Every implemented
component must work in all four combinations.

## Environment variables

`.env.example` is the registry. Summary: `DATABASE_URL`, `AUTH_SECRET`,
`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXT_PUBLIC_MAPBOX_TOKEN`,
`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `BAD_WORDS_API_KEY`.

## Special cases

- **AR cross-origin isolation**: `next.config.ts` sets COOP/COEP headers on
  `/ar/*` only (SharedArrayBuffer requirement for 8th Wall WASM).
- **Sigil image data**: v1 stored canvas JSON + PNG data-URLs as LONGTEXT.
  The rebuild keeps Json/Text columns for now (ADR candidate: move images to
  object storage before launch — flagged in docs/DATA_MODEL.md).
