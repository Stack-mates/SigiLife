# DATA_MODEL — Prisma schema reference

Source of truth: [`prisma/schema.prisma`](../prisma/schema.prisma).
**Rule:** any schema change updates this doc in the same commit (CLAUDE.md hard rule #1).

## Models

### User
The account + profile. Carried from v1: `username` (unique, nullable until
onboarding completes — its presence is the "profile complete" signal),
`avatar` (index into the avatar set), `theme` (LIGHT/DARK), `colorTheme`
(FOLIAGE/CYBER), `homeLocation` (Json `{lat,lng,name}` — v1 stored a JSON
string), `hasCompletedTutorial`, `sigilCount`/`destroyCount` (lifetime
counters, denormalized), `isAdmin`.
Dropped from v1: `googleId`, `picture` (live on `Account`/session now),
`homeTeam`, `lightOrDark` (redundant with `theme`).

### Account / Session / VerificationToken
Standard Auth.js Prisma-adapter tables. Replace v1's hand-rolled Google
verification + `express-mysql-session` `sessions` table.

### Sigil
The core object. `name`, `intention` (the original statement), `canvasData`
(Json — Fabric.js canvas state, was LONGTEXT string in v1), `imageData`
(Text — PNG data-URL render; **flagged for object storage before launch**,
see Open questions), `isCharged` + `chargedEmotion` (new — v1 didn't record
which emotion), `locationName`/`latitude`/`longitude` (map placement),
`chargeScore`/`destroyScore` (denormalized vote tallies), and **`status`
enum `ACTIVE | DESTROYED`** — new in the rebuild: v1 hard-deleted destroyed
sigils, losing the user's history. Destroyed sigils stay queryable for the
"sigils completed" record; only `ACTIVE` ones count against slots.

### SigilVote
One row per (sigil, user): `voteType` enum `CHARGE | DESTROY`,
unique `(sigilId, userId)`. Toggle semantics: same vote again ⇒ delete row;
opposite vote ⇒ update row. Scores on Sigil are recomputed in the same
transaction (see API_CONTRACT vote endpoint).

### Follow
`(followerId, followingId)` unique pair. "SigiFriends" = mutual follows
(computed, not stored).

### SigilShare
Replaces v1's `SigilGroup`, which stored a denormalized username varchar.
Now a real join: `sigilId` + `userId` (the SigiLite), unique pair, cascade
on sigil delete.

### SvgVector
Letterform seed data: one row per character (`character`, `vectorData` SVG
path, `width`, `height`). Seeded from font files via the seed script (v1:
`server/prisma/seed-opentype.js` on `main`). Read-only at runtime.

### ArPlacement
One per (user, sigil): position `posX/Y/Z` + rotation quaternion
`rotX/Y/Z/W`. Carried from v1 unchanged. Used by M8 AR.

### Subscription *(new)*
Stripe mirror: `stripeCustomerId`, `stripeSubscriptionId`, `plan` enum
(`FREE | PREMIUM`), `status` (Stripe status string), `currentPeriodEnd`.
One per user. Synced only by the Stripe webhook — never written from
request handlers.

### Entitlement *(new)*
What a user is actually allowed, decoupled from how they got it:
`key` (`sigil_slots`, `premium_styles`), `value` (Json), `source`
(`SUBSCRIPTION | GRANT`). Read via `lib/entitlements.ts` — application code
never reads Subscription directly to make permission decisions.

## Migration notes from v1 (MySQL, on `main`)

| v1 | Rebuild | Why |
|---|---|---|
| Int autoincrement IDs | `cuid()` String IDs | non-guessable URLs (`/grimoire/sigil/[id]` is exposed) |
| `sessions` table + express-session | Auth.js `Session` | ADR-003 |
| `User.googleId`, `User.picture` | `Account` row | adapter-managed |
| `SigilGroup.groupMember` varchar | `SigilShare.userId` FK | referential integrity; renames don't break shares |
| hard DELETE on destroy | `status = DESTROYED` | destruction is the product's completion mechanic; history has value |
| `voteType` varchar | `VoteType` enum | type safety |
| MySQL `LONGTEXT` canvas/image | `Json` / `Text` | Postgres equivalents |

## Open questions

- **imageData in Postgres** is fine for beta but will bloat the DB. Decide
  before launch: move renders to object storage (S3/R2) and store a URL.
  Owner: TBD. Tracked as ADR candidate.
- Exact premium slot counts — see features/monetization.md open questions.
