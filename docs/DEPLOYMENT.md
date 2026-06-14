# DEPLOYMENT — self-hosted on unraid (ADR-012)

SigiLife self-hosts: the Next.js app as a `output: "standalone"` Docker
container, co-located with Postgres, fronted by a Cloudflare Tunnel. No
Vercel. App ↔ DB over localhost. This doc is the whole path.

> **Reversible by design.** The app reaches Postgres only via `DATABASE_URL`
> and is a plain Node/Docker container. Moving the DB or the app to managed
> hosting later is a config change — see the migration trigger in ADR-012.

## Local development

You don't need Docker for the app in dev — run it directly, with just Postgres
in a container:

```bash
docker compose up -d db          # Postgres 16 on localhost:5432
cp .env.example .env.local       # set DATABASE_URL to the local db (below)
npm run db:migrate               # apply migrations
npm run dev                      # http://localhost:3000
```

Local `DATABASE_URL`:
`postgresql://sigilife:sigilife@localhost:5432/sigilife`

Keep the local Postgres **major version matched to production** (16) so bugs
don't hide. Schemas stay in sync via Prisma migrations (committed) + the seed
script.

## Production on unraid (Purity)

One `.env` file beside `docker-compose.yml` (never committed) holds the real
secrets — see `.env.example` for the full list. Then:

```bash
# On the unraid box, in the repo dir:
docker compose --profile prod up -d --build   # builds the app image, starts app + db
docker compose exec app npx prisma migrate deploy
```

The app binds to `127.0.0.1:3000` — it is **not** exposed to the public
internet directly. A Cloudflare Tunnel publishes it:

### Cloudflare Tunnel (free TLS, hides the home IP, no port-forwarding)

1. Add your domain to Cloudflare (free plan).
2. Run a `cloudflared` container on unraid (Community Apps has a template),
   authenticated to your Cloudflare account.
3. Create a tunnel and a public hostname route:
   `sigilife.yourdomain.com → http://app:3000` (or `http://localhost:3000`
   if cloudflared shares the app's network).
4. Cloudflare terminates TLS and proxies to the tunnel — no inbound ports
   opened on your router, residential IP stays hidden, and you get basic
   DDoS shielding.

### Admin access
Use **Tailscale** (already on the box) for SSH / Prisma Studio / db access —
never expose Postgres or admin surfaces publicly.

## Backups — NON-NEGOTIABLE, off-box (ADR-012)

Backups on the same machine are not backups. Nightly `pg_dump` pushed off-box:

```bash
# cron on unraid, nightly. Adjust creds/bucket.
docker compose exec -T db pg_dump -U sigilife sigilife | gzip > /tmp/sigilife-$(date +%F).sql.gz
rclone copy /tmp/sigilife-$(date +%F).sql.gz remote:sigilife-backups/   # Backblaze B2 / S3 / etc.
```

**Test a restore once** before you rely on it:
```bash
gunzip -c sigilife-YYYY-MM-DD.sql.gz | docker compose exec -T db psql -U sigilife sigilife
```

## Network isolation

Put the public-facing app on an isolated VLAN/segment so a compromise can't
pivot into the home LAN. The DB has no public exposure (localhost + the app
container network only).

## Updating a release

```bash
git pull
docker compose --profile prod up -d --build       # rebuild + restart app
docker compose exec app npx prisma migrate deploy  # if migrations changed
```

(A small GitHub Action that SSHes in and runs these is the cheap replacement
for Vercel's push-to-deploy — add it if the manual step gets old.)

## When to leave home hosting

Per ADR-012's migration trigger: when downtime starts costing real
users/revenue, when you must scale beyond one box, or when babysitting it
exceeds a managed service's cost — point `DATABASE_URL` at Neon/Supabase/RDS
(and move the app to a managed host if needed). No code changes required.
