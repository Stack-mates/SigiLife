# Feature: Social (follows, SigiFriends, sharing, scrying)

**Milestone:** M3–M4 (follows with grimoire; feed polish with map) · **Status: implemented 2026-06-15 (DB-backed, against the dev-identity shim)** — user search, follow/unfollow (idempotent), followers/following/mutual (SigiFriends), and sigil sharing (followed-only, no partial shares) all live via `/api/users*` and `/api/sigils/[id]/share`; UI = `social/UserSearch` + `social/FollowButton` + `social/FriendsList` on `/grimoire/friends` (linked in Menu). **Update 2026-06-17:** the shared-sigil **scrying feed is now built** — `social/SharedWithMe` (the "scrying mirror") renders sigils shared *with* you via `lib/user/actions.ts listSharedWithMe()`, mounted on `/grimoire/friends`. **Still deferred:** a share *picker* UI to create shares from the creation/sigil pages (the write side, `POST /api/sigils/[id]/share`, exists and is seed-demoable); real per-user auth replaces the dev shim in the auth milestone.

## Purpose
Light-touch social: follow people, share sigils with mutuals (SigiFriends),
and "scrye" friends' activity through the mirror. No public square — the
graph is the friend group.

## User stories
- I search a username and follow/unfollow.
- I see followers / following / mutuals (SigiFriends) on my profile.
- At sigil creation (or share later) I pick SigiFriends to share with;
  they see it in their scrying view (SigiLites of that sigil).
- The friends page shows my SigiFriends and their recent shared sigils.

## Components & routes
- `grimoire/friends/page.tsx` → `social/UserSearch`, `social/FriendsList`,
  `social/FollowButton`.
- Share picker inside `sigil/StyleSigil` (creation) and sigil page (later).

## API / data
- `GET /api/users?q=` · `GET /api/users/[id]/follows?direction=...`
- `POST/DELETE /api/users/[id]/follows`
- `POST /api/sigils/[id]/share` — userIds must be followed by the owner.
- Models: Follow, SigilShare. SigiFriends = intersection of follows (computed).

## v1 reference (`main`)
`src/components/.../Profile/UserFriends.tsx`, `ScryeFriends/*` (unfinished —
the mirror concept is good, the implementation was abandoned; treat as
design inspiration only), `server/routes/user.routes.ts`.

## Acceptance criteria
- [ ] Follow/unfollow is idempotent (DB unique constraint, friendly errors).
- [ ] Share list only offers people I follow; shares survive their renames (FK, not username).
- [ ] Friends page renders sensibly at 0 friends (invite copy).

## Open questions
- Notifications for "X shared a sigil with you" — in-app badge only? (No push for launch.)
- Should following be mutual-approval (requests) or open follow? (v1: open. Lean: open.)
