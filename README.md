# SigiLife

**Distill your intentions into symbols. Place them in the world. Charge them
with feeling. Destroy them when they've done their work.**

SigiLife is an intention-based social app built around the practice of sigil
crafting: write an intention, draw a personal symbol seeded from its letters,
pin it to a real-world location on a map, share it with friends, and ritually
charge or destroy it while the community lends its energy through votes.

> **This branch is a from-scratch rebuild.** The original bootcamp thesis
> implementation (React/Vite/Express/MySQL) is preserved on `main` — see it
> with `git show main:<path>`. The rebuild is Next.js full-stack, documented
> for AI-assisted collaborative development. All components are currently
> **documented stubs** — see [CLAUDE.md](CLAUDE.md) for the working agreement.

## Quickstart

```bash
npm install
cp .env.example .env.local        # fill in values — see comments in the file
npm run db:migrate                # needs a Postgres DATABASE_URL
npm run dev                       # http://localhost:3000
```

You need: a Postgres database (local Docker, Neon, or Supabase), Google OAuth
credentials, and a Mapbox public token. Stripe and 8th Wall keys are only
needed for the monetization and AR milestones.

## Documentation index

| Doc | What it covers |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Working agreement for AI agents + devs: rules, commands, workflow |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Stack, request flows, route groups, client/server boundaries |
| [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) | Vision, core loop, user journey, screens |
| [docs/DATA_MODEL.md](docs/DATA_MODEL.md) | Every Prisma model + migration notes from v1 |
| [docs/API_CONTRACT.md](docs/API_CONTRACT.md) | Every endpoint: auth, body, response, old equivalent |
| [docs/COMPONENT_MAP.md](docs/COMPONENT_MAP.md) | Component tree, page mounts, old→new mapping |
| [docs/CONVENTIONS.md](docs/CONVENTIONS.md) | Naming, styling, commits, PR flow, stub maintenance |
| [docs/GLOSSARY.md](docs/GLOSSARY.md) | Domain language — sigil, charge, grimoire, scrye… |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Milestones M0–M8 with definitions of done |
| [docs/DECISIONS.md](docs/DECISIONS.md) | ADR log — why Next.js, Postgres, Auth.js, Stripe |
| [docs/features/](docs/features/) | Per-area specs: auth, make-sigil, charge-destroy, grimoire, map, social, tutorial, ar, monetization |

## Team

Two developers + AI agents. Branch flow and ownership are described in
[CLAUDE.md](CLAUDE.md) and [docs/CONVENTIONS.md](docs/CONVENTIONS.md).
