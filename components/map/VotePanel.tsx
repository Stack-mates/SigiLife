/**
 * VotePanel — community ✨charge / 🔥destroy voting control.
 * STATUS: stub · "use client" (M4)
 *
 * Props (planned): { sigilId: string; chargeScore: number;
 * destroyScore: number; viewerVote: VoteType | null }
 * POST /api/sigils/[id]/vote with optimistic toggle (same vote retracts,
 * opposite switches) and reconcile from the response. Used on the map popup
 * and the sigil page. Never shown on the viewer's own sigil? — no, v1
 * allowed self-votes; keep parity (revisit post-launch).
 *
 * v1 reference: vote UI in main:src/components/.../Map/MapBox.tsx and
 *   .../SigiLibrary/SigilPage.tsx; logic in server/routes/sigil.routes.ts
 * @see docs/features/map.md
 */
export function VotePanel() {
  return <div>VotePanel (stub)</div>;
}
