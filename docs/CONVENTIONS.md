# CONVENTIONS

## Naming & files

- Components: `PascalCase.tsx`, one component per file, named export matching
  the filename. Feature folders are lowercase (`components/sigil/`).
- lib modules: `camelCase.ts`, named exports only (no default exports outside
  Next.js-required files).
- Routes: kebab-case segments (`make-sigil`, `charge-sigil`).
- DB: models PascalCase singular, fields camelCase, enums SCREAMING_SNAKE values.
- Identifiers use glossary terms: `destroySigil()`, not `deleteSigil()`.

## Imports

- Always `@/` alias from repo root (`@/components/sigil/SigilThumb`).
- No deep relative imports (`../../..` is a smell — restructure or re-export).
- Stubs import nothing heavy: fabric/mapbox/ogl/stripe land with their milestones.

## Client/server

- `"use client"` at interaction leaves; pages stay server components except
  the canvas/map/ritual pages listed in ARCHITECTURE.md.
- Data flows down from server components as props; mutations go through
  `/api/*` routes (see API_CONTRACT) then `router.refresh()`.
- Secrets only in server code (`lib/`, route handlers). `NEXT_PUBLIC_*` is
  the only env that may appear in client components.

## Styling

- Tailwind v4 utilities first; the shared design tokens (theme variables,
  glasscard, glow) live in `app/globals.css` as `@layer` components —
  port v1's `.glasscard`, `.pinkbutton`, `.navmenu` system rather than
  reinventing it (reference: `git show main:src/index.css`).
- Every surface must work in foliage/cyber × light/dark. Test all four.
- Mobile-first: design for phone portrait, enhance upward. Use `clamp()`/
  viewport units for the ritual pages like v1 did.

## Stub comment blocks

Every stub file opens with:

```
/**
 * <Name> — <one-line purpose>
 * STATUS: stub
 * <details: route/props/state/data/children as relevant>
 * v1 reference: git show main:<path>   (if one exists)
 * @see docs/features/<area>.md
 */
```

Maintenance rules:
- Implementing a file: flip `STATUS: stub` → `STATUS: implemented`, trim the
  block down to what stays true (purpose + non-obvious constraints), keep the
  `@see` line.
- Changing planned behavior before implementing: edit the comment block AND
  the feature doc together.

## Git

- Branches: `feat/<area>-<thing>`, `fix/...`, `docs/...`, `chore/...`.
- Commits: imperative subject ≤ 72 chars, optionally prefixed
  (`feat:`, `fix:`, `docs:`, `chore:`). Body explains *why* when non-obvious.
- PRs: small, single-area, must pass `lint` + `typecheck` + `build`, must
  include any doc updates (drift is a review blocker). The other dev reviews;
  AI review is supplementary, not a substitute.

## Ported shader code (WebGL/WebGPU effects)

Large third-party-derived effect files (e.g. `charge/SplashCursor.tsx`,
`destroy/EvilEye.tsx`) carry a file-level `eslint-disable` header and are
exempt from our usual lint/style rules — they're ported near-verbatim so they
can be re-synced from upstream. Keep adaptations minimal and clearly marked
(props, cleanup, reduced-motion). Don't refactor them to match house style.

## Testing policy

Two layers, both runnable from the shell (so agents can self-verify):

- **Unit (Vitest)** — pure logic in `lib/` (`extractSigilCharacters`,
  `vectorSeed`). `npm run test`. Add cases when you touch that logic.
- **E2E (Playwright, `tests/e2e/`)** — real chromium drives the real app
  against the dev server + Postgres. `npm run test:e2e`. `smoke.spec` checks
  pages render their content; `loop.spec` walks the whole journey
  (write → draw → style → keep → library → charge → destroy → closed cases).
  Prereqs: `docker compose up -d db` and a dev server (Playwright reuses
  :3001 or starts one). Rituals run under `reducedMotion: "reduce"` so the
  flow is tested without flaky headless WebGL — the *visuals* still want a
  human/device pass.

Run both before claiming a feature done. When you add a feature with a user
flow, extend `loop.spec` (or add a spec) so the flow is guarded forever.

### Visual review (no browser MCP needed)

There's no browser/screenshot MCP connected, but you can still *see* the UI:
`SIGIL_ID=<id> node scripts/screenshots.mjs` captures the key pages to
`/tmp/sigishots/*.png` (phone viewport by default; `VIEWPORT=desktop` for
wide). An image-capable read tool can then view them. Use this to check
layout/visuals before claiming a UI is done — don't assert "can't see it."
Caveat: headless skips the rituals' WebGL (reduced-motion), so the fluid/eye
*effects* still need a real device; everything static renders truthfully.
