# CLAUDE.md — AI Agent Instructions for SigiLife

## What this app is

SigiLife is an intention-based "magic" social app. Users write an intention,
draw a **sigil** (a personal symbol seeded from the intention's unique
consonants), style it, place it at a real-world location on a map, share it
with friends, then ritually **charge** it (empower) or **destroy** it
(release) while the community votes. The domain language matters — read
[docs/GLOSSARY.md](docs/GLOSSARY.md) and use its terms exactly (a sigil is
"charged", never "liked"; it is "destroyed", never "deleted" — destruction is
a ritual lifecycle state, the row survives).

This is a commercial rebuild of a bootcamp thesis project by a two-person
team working alongside AI agents. **The previous implementation lives on the
`main` branch** — see "Old code reference" below.

## Current phase: documented scaffold

Every page, API route, component, and lib module exists as a **stub**: a
detailed comment block describing what belongs in the file, plus a trivial
placeholder export so the project compiles. When you implement a stub:

1. Read its comment block AND the `@see docs/features/<area>.md` it cites.
2. Implement to that spec; if you deviate, update the feature doc in the same PR.
3. Replace the `STATUS: stub` line in the comment block with `STATUS: implemented`.
4. Update [docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md) if the component tree changed.

## Read these first, per task type

| Task | Read |
|---|---|
| Any feature work | `docs/features/<area>.md` + [docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md) |
| API / backend work | [docs/API_CONTRACT.md](docs/API_CONTRACT.md) + [docs/DATA_MODEL.md](docs/DATA_MODEL.md) |
| DB schema change | [docs/DATA_MODEL.md](docs/DATA_MODEL.md) (update it in the same PR) |
| New page / routing | [ARCHITECTURE.md](ARCHITECTURE.md) (route groups, client/server split) |
| Styling / UI | [docs/CONVENTIONS.md](docs/CONVENTIONS.md) + [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) (visual identity) |
| Unsure what to build | [docs/ROADMAP.md](docs/ROADMAP.md) (current milestone) |
| Starting a milestone | `docs/plans/M<N>-*.md` (detailed tasks; if missing, write it from `docs/plans/TEMPLATE.md` first) |

## Commands

```bash
npm run dev          # start Next.js dev server (http://localhost:3000)
npm run build        # production build — run before claiming work is done
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run db:migrate   # prisma migrate dev (needs DATABASE_URL)
npm run db:generate  # regenerate prisma client after schema edits
npm run db:studio    # browse the database
npx prisma validate  # schema sanity check (no DB needed)
```

## Hard rules

1. **Never** change `prisma/schema.prisma` without updating
   [docs/DATA_MODEL.md](docs/DATA_MODEL.md) in the same commit.
2. **Never** add/change an API route without updating
   [docs/API_CONTRACT.md](docs/API_CONTRACT.md). All inputs are zod-validated
   (`lib/validation/`); all errors use the shared error envelope.
3. `"use client"` belongs at the **leaves** (interactive components), not on
   pages/layouts, unless the page is inherently client-heavy (canvas, map,
   WebGL rituals — these are listed in ARCHITECTURE.md).
4. **No new dependencies** without a one-line ADR entry in
   [docs/DECISIONS.md](docs/DECISIONS.md) explaining why.
5. **Never commit secrets.** `.env.example` is the template and the registry
   of every env var that exists.
6. Auth checks live server-side (route handlers / server components via
   `lib/auth.ts`), never trust the client.
7. Domain language from the glossary in all UI copy, code identifiers, and docs.

## Old code reference

The full working v1 (React/Vite/Express/MySQL) is on `main`:

```bash
git show main:src/App.tsx                                   # old route map
git show main:server/routes/sigil.routes.ts                 # old API logic
git show main:server/prisma/schema.prisma                   # old DB schema
git ls-tree -r main --name-only | grep -i <keyword>         # find old files
```

The old→new mapping table is in
[docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md). Consult old code for business
logic (consonant extraction, vote toggling, slot limits) but do **not** copy
its structure — the rebuild exists because the structure needed redoing.

## Workflow for two devs + agents

- Branch naming: `feat/<area>-<thing>` (e.g. `feat/make-sigil-draw-canvas`),
  `fix/...`, `docs/...`, `chore/...`.
- Small PRs into `rebuild/nextjs-scaffold` (until it merges to `main`; then `main`).
- Every PR that changes behavior updates the relevant doc(s). Docs drift is a
  review blocker.
- Commit format: see [docs/CONVENTIONS.md](docs/CONVENTIONS.md).
- If two areas conflict (e.g. both devs touch `lib/`), the feature doc's
  "open questions" section is where disagreements get written down and resolved.

## Definition of done (stub → implemented)

- Implements the stub's comment-block spec or the spec was updated deliberately.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- API routes: zod validation + error envelope + auth check + API_CONTRACT row updated.
- UI: works in light/dark and both color themes (foliage/cyber), mobile-first.
- `STATUS:` line flipped, COMPONENT_MAP updated if the tree changed.
