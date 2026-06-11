# API_CONTRACT — REST endpoints

**Rule:** no endpoint is added/changed without updating this table
(CLAUDE.md hard rule #2).

## Conventions

- All routes under `/app/api/`, JSON in/out.
- **Validation:** every body/query is parsed with a zod schema from
  `lib/validation/` — handlers never touch unvalidated input.
- **Auth:** "session" means a valid Auth.js session (checked via `auth()`
  from `lib/auth.ts`). Ownership checks are explicit per row below.
- **Success envelope:** `{ "data": ... }` · **Error envelope:**
  `{ "error": { "code": "NOT_FOUND" | "UNAUTHORIZED" | "FORBIDDEN" | "VALIDATION" | "CONFLICT" | "LIMIT_REACHED" | "INTERNAL", "message": string } }`
  with matching HTTP status.
- Stubs return `501 { error: { code: "NOT_IMPLEMENTED" } }` until built.

## Endpoints

| Method | Path | Auth | Body / Query | Returns | v1 equivalent (on `main`) |
|---|---|---|---|---|---|
| * | `/api/auth/[...nextauth]` | — | Auth.js managed | Auth.js managed | `POST /api/auth/google`, `GET /api/auth/me` |
| GET | `/api/sigils` | session | `?scope=all\|mine\|user:<id>&status=active\|destroyed` | `{data: Sigil[]}` (feed/map; includes scores, location, owner summary) | `GET /allsigils`, `GET /user/:userId/sigils` |
| POST | `/api/sigils` | session | `createSigilSchema`: name, intention, canvasData, imageData, location?, shareWith?: userId[] | `{data: Sigil}` · `LIMIT_REACHED` if no free slot (via `lib/entitlements`) | `POST /api/sigils` |
| GET | `/api/sigils/[id]` | session | — | `{data: Sigil}` incl. votes summary, SigiLites, viewer's vote | `GET /:id` + `/:id/vote-status` |
| PATCH | `/api/sigils/[id]` | owner | `updateSigilSchema`: name?, location? | `{data: Sigil}` | `PATCH /:id`, `PATCH /:id/location` |
| DELETE | `/api/sigils/[id]` | owner | — | sets `status: DESTROYED`, increments destroyCount. Hard-delete is admin-only. | `DELETE /:id` (was hard delete) |
| POST | `/api/sigils/[id]/vote` | session | `voteSchema`: `{type: "CHARGE"\|"DESTROY"}` | `{data: {chargeScore, destroyScore, viewerVote}}` — toggle semantics, transactional recompute | `POST /:sigilId/vote` |
| PATCH | `/api/sigils/[id]/charge` | owner | `chargeSchema`: `{emotion: "HOPE"\|"GRIEF"\|"RELIEF"\|"JOY"\|"LONGING"}` | `{data: Sigil}` sets isCharged + chargedEmotion | `PATCH /:id/charge` |
| POST | `/api/sigils/[id]/share` | owner | `shareSchema`: `{userIds: string[]}` (must be follows) | `{data: SigilShare[]}` | `POST /share` + SigilGroup |
| GET | `/api/users` | session | `?q=<username prefix>` | `{data: UserSummary[]}` | `GET /users/search` |
| GET | `/api/users/[id]` | session | — | `{data: profile + active sigil count + follow state}` | `GET /users/:id` |
| PATCH | `/api/users/[id]` | self | `updateUserSchema`: username?, avatar?, theme?, colorTheme?, homeLocation?, hasCompletedTutorial? | `{data: User}` | `PATCH /users/:id` |
| DELETE | `/api/users/[id]` | self | — | account deletion (cascade) | `DELETE /users/:id` |
| GET | `/api/users/[id]/follows` | session | `?direction=followers\|following\|mutual` | `{data: UserSummary[]}` | `/followers`, `/following` |
| POST | `/api/users/[id]/follows` | session | — (id = target) | `{data: Follow}` | `POST /users/follow` |
| DELETE | `/api/users/[id]/follows` | session | — | unfollow | `PATCH /users/unfollow` |
| POST | `/api/vectors` | session | `vectorsSchema`: `{characters: string[]}` | `{data: SvgVector[]}` letterform seeds for the draw canvas | `POST /vectors/character-vectors` |
| GET/PUT | `/api/ar/placements` | session | PUT: `placementSchema` (sigilId, pos, quaternion) | `{data: ArPlacement}` | (unfinished in v1) |
| POST | `/api/stripe/checkout` | session | `{plan: "PREMIUM"}` | `{data: {url}}` Stripe Checkout session | — (new) |
| POST | `/api/stripe/webhook` | Stripe signature | raw body | 200; syncs Subscription + Entitlements | — (new) |

## Server actions policy

Route handlers are the default (they're documentable in this table and
callable from anywhere). Server actions may be used for simple owner-only
form mutations (e.g. settings) — if one is added, it gets a row here marked
`(action)`.

## Content filtering

Intention text is checked server-side inside `POST /api/sigils` (and the
write step may pre-check client-side for UX) via the Bad Words API
(`BAD_WORDS_API_KEY`). Filter failure ⇒ `VALIDATION` error listing flagged
words. v1 exposed this as a standalone `/filter-content` endpoint; the
rebuild keeps it internal to creation.
