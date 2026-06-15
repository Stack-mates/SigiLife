# Feature: AR Placement (8th Wall)

**Milestone:** M8 — explicitly post-launch · **Status:** stub (flag-gated)
**Last researched:** 2026-06-14 (engine landscape re-confirmed; open questions
resolved — see below. Detailed task plan: [../plans/M8-ar.md](../plans/M8-ar.md))

## Purpose
Place a sigil in physical space: SLAM surface detection, tap to anchor,
store position + rotation quaternion so the placement can be revisited.
The endgame vision: sigils as persistent AR objects at real locations.

## 8th Wall is now open source (the landscape changed — Feb 2026)

Niantic Spatial retired the hosted 8th Wall platform on **2026-02-28**
(logins, cloud editor, XR Studio are gone; legacy hosted experiences run
until 2027-02-28). The technology continues as a community project at
**[8thwall.org](https://8thwall.org)** in two distributions:

| Distribution | Where | License | Contents |
|---|---|---|---|
| **Open-source framework** | [github.com/8thwall/8thwall](https://github.com/8thwall/8thwall) (`packages/engine`) | MIT | Core architecture, Face Effects, Image Targets, Sky Effects, utilities, examples. **No SLAM/world tracking.** |
| **Distributed Engine Binary** | [github.com/8thwall/engine](https://github.com/8thwall/engine) · npm `@8thwall/engine-binary` · CDN (jsdelivr) · [8th.io/xrjs](https://8th.io/xrjs) | Binary-only limited-use license | World Effects (**SLAM**), Face Effects, Image Targets, Sky Effects, Absolute Scale. No VPS/Lightship Maps/hand tracking. |

SigiLife needs **SLAM** (surface detection + world anchoring), so M8 uses
the **Distributed Engine Binary**. No API keys or accounts are required
anymore — the binary loads standalone.

Docs: [8thwall.org/docs](https://8thwall.org/docs) ·
[Open-source overview](https://8thwall.org/docs/open-source) ·
[Transition announcement](https://www.8thwall.com/blog/post/208587408737/8th-wall-open-source)

## ✅ Licensing (was a blocker — now resolved, with one obligation)

The binary's limited-use license **permits commercial use** as part of a
broader application. It **prohibits** products "offered for a fee … whose
value derives, entirely or substantially, from the functionality of the
Software," plus modification, reverse engineering, redistribution outside
the original form, and building competing products.

**SigiLife assessment:** AR placement is a secondary feature of a broader
social/intention app — SigiLife's value does not derive substantially from
the engine, so our commercial use is permitted. Two obligations to honor at
M8 implementation:

1. **Attribution (required):** keep the unmodified `xr.js` with its
   copyright notice visible in devtools, or surface the Niantic Spatial
   copyright + license link inside the app (an "about" line on the AR
   screen). Per their attribution guidelines.
2. **Never paywall AR as a standalone product** — premium-gating it inside
   SigiLife is fine (value still derives from the app), but don't market
   "pay for AR" as the offer. Keep monetization framing on slots/styles.

Recorded as ADR-007 in docs/DECISIONS.md.

## Current assets

- `public/xr/` — engine binaries (WASM, xr.js, xr-slam.js, xr-face.js)
  snapshotted from the v1 project (~Jan 2026 vintage). **Do not lint,
  format, or modify** (license prohibits modification anyway).
  At M8: replace with a **pinned `@8thwall/engine-binary` from npm** (copy
  artifacts into `public/xr/` at build, or load from CDN) so we pick up
  browser-compat fixes — the community repo is the living source now.
- `types/8thwall.d.ts` — XR8 global type declarations (carried from v1).
- `next.config.ts` already sets COOP/COEP headers on `/ar/*`
  (SharedArrayBuffer requirement).
- ~~`vendor/xr-standalone.zip`~~ — removed 2026-06-11: the file was a
  corrupt download (a saved HTML page of the GitHub repo, not an archive).
  The real artifact is reproducible from npm/GitHub releases; nothing to vendor.

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
v1 already depended on `@8thwall/engine-binary` — same package we'll pin at M8.

## Acceptance criteria (M8)
- [ ] Admin can place a sigil on a surface and see it again on revisit.
- [ ] Non-AR devices get a graceful "not supported" screen, never a crash.
- [ ] AR bundle loads only on /ar/* (zero cost to the rest of the app).
- [ ] Niantic Spatial attribution visible per license (xr.js notice intact
      or in-app credit).
- [ ] Engine pinned to a specific `@8thwall/engine-binary` version, noted
      in DECISIONS.md.

## Open questions — RESOLVED 2026-06-14 (kept here as the decision record)
- **Engine delivery:** ✅ **Self-host.** Pin `@8thwall/engine-binary@1` and
  copy `dist/*` into `public/xr/` at build (replacing the stale Jan-2026
  snapshot). Self-hosting keeps cross-origin isolation simple (our COOP/COEP
  headers are already scoped to `/ar/*`) and works with the standalone Docker
  deploy (ADR-012). jsdelivr CDN
  (`https://cdn.jsdelivr.net/npm/@8thwall/engine-binary@1/dist/xr.js`,
  `crossorigin="anonymous"`) stays a documented fallback. The new package
  exports `XR8Promise` rather than relying on the `XR8` global — update
  `types/8thwall.d.ts` accordingly.
- **Premium-only?** ✅ **No.** Monetization is intentionally dormant (user
  decision, 2026-06-14); framing stays on slots/styles (ADR-007). AR ships
  free behind the env flag — do not wrap it in `PaywallGate`. Revisit only if
  billing is later activated.
- **Community-fork health:** ✅ **8thwall.org is the source.** Official
  continuation backed by Niantic Spatial; binary at `github.com/8thwall/engine`
  (npm `@8thwall/engine-binary@1`), MIT framework at `github.com/8thwall/8thwall`.
  The separate `8thwall.io` community continuation is not authoritative — not
  our lineage.
- **Gating:** ✅ env flag `NEXT_PUBLIC_AR_ENABLED` (default off) now; add an
  `isAdmin` check when auth (M1) lands. See [../plans/M8-ar.md](../plans/M8-ar.md).
