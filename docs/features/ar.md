# Feature: AR Placement (8th Wall)

**Milestone:** M8 — explicitly post-launch · **Status:** stub (flag-gated)

## Purpose
Place a sigil in physical space: SLAM surface detection, tap to anchor,
store position + rotation quaternion so the placement can be revisited.
The endgame vision: sigils as persistent AR objects at real locations.

## Current assets (carried from v1)
- `public/xr/` — 8th Wall engine binaries (WASM, xr.js, xr-slam.js,
  xr-face.js). **Do not lint, format, or modify.**
- `vendor/xr-standalone.zip` — the standalone engine reference bundle.
- `types/8thwall.d.ts` — XR8 global type declarations.
- `next.config.ts` already sets COOP/COEP headers on `/ar/*`
  (SharedArrayBuffer requirement).

## ⚠ Commercial blockers (resolve before building M8)
- **8th Wall licensing**: v1 used it under bootcamp circumstances. Commercial
  use requires a paid 8th Wall plan — price it before committing, and compare
  against WebXR (free, narrower device support) as the fallback. Record the
  outcome as an ADR.

## Design
- `app/(app)/ar/[sigilId]/page.tsx` → `ar/ArViewer` (client, dynamic import,
  no SSR). Gated by an `arEnabled` feature flag (env or admin-only initially).
- Flow: camera permission → SLAM init → reticle on detected surface → tap →
  render sigil image as a textured plane → PUT placement.
- `GET/PUT /api/ar/placements` — one placement per (user, sigil)
  (`ArPlacement` model: posX/Y/Z + quaternion).

## v1 reference (`main`)
`src/components/.../Map/PlaceSigilInWorld.tsx` (incomplete but shows the
XR8 pipeline setup), `server/` ArPlacement endpoints were never finished.

## Acceptance criteria (M8)
- [ ] Admin can place a sigil on a surface and see it again on revisit.
- [ ] Non-AR devices get a graceful "not supported" screen, never a crash.
- [ ] AR bundle loads only on /ar/* (zero cost to the rest of the app).

## Open questions
- 8th Wall vs WebXR (cost vs reach) — the M8 gate decision.
- Is AR placement premium-only? (Natural upsell — see monetization.md.)
