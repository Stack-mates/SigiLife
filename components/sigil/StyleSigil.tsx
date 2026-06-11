/**
 * StyleSigil — style, name, place, share, save.
 * STATUS: stub · "use client"
 *
 * What goes here (M2):
 * - Style controls over a live preview: stroke color (applies to all
 *   strokes), decorative ring toggle, glow (shadow color). Premium styles
 *   render behind <PaywallGate> (M7).
 * - Name input (≤100 chars), optional location (MapSearchBox, M4), SigiFriend
 *   share picker (mutuals only, from /api/users/[me]/follows?direction=mutual).
 * - Save → POST /api/sigils with the full draft; success → router.push
 *   (/charge-sigil/[id]); LIMIT_REACHED → slot-full panel (destroy / premium).
 *
 * v1 reference: git show main:src/components/.../MakeSigilComponents/SaveSigil.tsx
 *   + the style section of DrawSigil.tsx (v1 mixed style into draw — split here)
 * @see docs/features/make-sigil.md
 */
export function StyleSigil() {
  return <div>StyleSigil (stub)</div>;
}
