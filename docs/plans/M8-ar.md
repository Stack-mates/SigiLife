# M8 Plan — AR Placement (8th Wall)

> **Post-launch (ROADMAP).** Launch = end of M7; this milestone starts only
> after the core loop is delightful (M5) and learnable (M6) and the app has
> shipped. Plan written 2026-06-14 at the user's request to lock the approach
> before any code. Engine landscape re-researched the same day (see below).

**Spec:** [../features/ar.md](../features/ar.md) ·
**Exit:** on a supported phone, an admin can place a sigil on a real surface,
leave, and revisit it anchored in the same spot; every other device gets a
graceful "not supported" screen; the rest of the app pays zero AR cost; and
all feature-doc acceptance criteria are checked.

## Open questions — RESOLVED 2026-06-14 (answers mirrored into features/ar.md)

- [x] **Engine lineage: 8thwall.org vs 8thwall.io?** → **8thwall.org.** It's
  the official continuation backed by Niantic Spatial; the binary lives at
  `github.com/8thwall/engine` (npm `@8thwall/engine-binary@1`) and the MIT
  framework at `github.com/8thwall/8thwall`. `8thwall.io` is a separate,
  less-authoritative community continuation — not our source.
- [x] **Engine delivery: self-host vs CDN?** → **Self-host.** Pin
  `@8thwall/engine-binary@1` as a dependency and copy `dist/*` into
  `public/xr/` at build, replacing the stale Jan-2026 snapshot. Self-hosting
  keeps the cross-origin-isolation story simple (our COOP/COEP headers are
  already scoped to `/ar/*`), works with the `output: "standalone"` Docker
  deploy (ADR-012), and avoids a runtime dependency on jsdelivr. CDN stays a
  documented fallback.
- [x] **Env-flag vs admin gate?** → **Both, layered.** Ship behind an env
  flag `NEXT_PUBLIC_AR_ENABLED` (default **off**) so AR is dormant exactly
  like the doc intends. When real auth lands (M1), additionally require
  `isAdmin` — the field already exists in the schema. Pre-auth the env flag is
  the only gate (the dev-identity shim makes everyone the same user).
- [x] **Premium-only?** → **No.** Monetization is intentionally dormant (user
  decision, 2026-06-14) and the framing stays on slots/styles per ADR-007.
  AR ships free behind the env flag; do **not** wrap it in `PaywallGate`.
  Revisit only if/when billing is activated.

## Dependency gate (ADR-006)

- [ ] `@8thwall/engine-binary@1` (8thwall.org binary distribution) — **ADR-015**
  (write it). Limited-use license; commercial use permitted as a secondary
  feature of a broader app (ADR-007). The old API used the `XR8` global; the
  pinned package now exports `XR8Promise` — `types/8thwall.d.ts` must be
  updated to match.

## Tasks (ordered; ✎ = doc update in the same PR)

### PR 1 — engine re-pin + API + gate (no device-dependent UI; the testable spine)
1. Add `@8thwall/engine-binary@1`. Add a build/copy step (npm `prebuild` or a
   small `scripts/copy-xr.mjs`) that populates `public/xr/` from
   `node_modules/@8thwall/engine-binary/dist`. **Gitignore the generated
   `public/xr/`** (it's reproducible) and delete the committed Jan-2026
   snapshot — keep `public/xr/LICENSE`/attribution per ADR-007. Update
   `types/8thwall.d.ts` for the `XR8Promise` export shape. ✎ ADR-015, ADR-006
   note, ar.md "Current assets".
2. `lib/validation` — `placementSchema`: `{ sigilId, posX, posY, posZ, rotX,
   rotY, rotZ, rotW }` (finite numbers). ✎ API_CONTRACT.
3. `app/api/ar/placements/route.ts` — implement (reference its stub block):
   GET viewer's placements (or `?sigilId=` for one), PUT upsert one per
   `(user, sigil)` (`ArPlacement`), owner-only, flag-gated. ✎ API_CONTRACT
   row (mark Implemented).
4. `lib/flags.ts` — `arEnabled()` reading `NEXT_PUBLIC_AR_ENABLED`. ✎
   .env.example (register the var) + ARCHITECTURE env section.
5. `app/(app)/ar/[sigilId]/page.tsx` — flag gate (off → "AR isn't available
   yet" screen, not a crash); load the sigil; mount `<ArViewer>`; render the
   Niantic Spatial attribution line (ADR-007). Keep no nav entry — AR stays
   unreachable until a flagged entry point lands in PR 3.

### PR 2 — the ArViewer pipeline (device-dependent; the hard part)
6. `components/ar/ArViewer.tsx` (reference its stub block) — `"use client"`,
   `dynamic(..., { ssr: false })`. Pipeline: camera permission → `XR8Promise`
   init → SLAM localization → surface reticle → tap to anchor the sigil image
   as a textured plane → PUT placement. Revisit: hydrate from an existing
   placement. **Unsupported device → graceful fallback, never a crash.**
   Niantic copyright stays visible (unmodified `xr.js` notice or in-app
   credit). ✎ flip STATUS, COMPONENT_MAP.
7. Wire camera/permission denial and "WebAR not supported" into distinct,
   friendly states (feature-detect `XR8` + `getUserMedia` before init).

### PR 3 — entry point + revisit polish
8. A flagged "Place in AR" action on the sigil detail page
   (`app/(app)/grimoire/sigil/[sigilId]`) — hidden entirely when
   `arEnabled()` is false, so AR is invisible while dormant. Links to
   `/ar/[sigilId]`. ✎ COMPONENT_MAP.
9. Re-anchor / move-placement UX; "placed here" confirmation on revisit.

## Verification (beyond lint/typecheck/build — I can't see AR via the desktop MCP)
- **Phone, over HTTPS** (Cloudflare Tunnel, not `localhost`): with
  `NEXT_PUBLIC_AR_ENABLED=true`, grant camera → reticle appears on a surface →
  tap places the sigil → reload `/ar/[id]` → sigil re-anchors in place.
- Negative: flag **off** → page shows the "not available" screen and the
  detail-page entry point is absent; desktop / non-AR browser → graceful
  "not supported", no crash; camera **denied** → friendly prompt, no crash.
- License: Niantic Spatial attribution visible (devtools notice in `xr.js`
  intact, or in-app credit on the AR screen).
- Bundle: AR engine loads only on `/ar/*` (check the route's First Load JS;
  the rest of the app unchanged).
- `git grep "STATUS: stub" app/\(app\)/ar components/ar app/api/ar` → empty.

## Done = ROADMAP M8 row checked. M8 is the final milestone — no next plan to
write; instead update OVERVIEW.md to mark the build complete.
