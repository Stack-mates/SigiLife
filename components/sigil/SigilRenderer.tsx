/**
 * SigilRenderer — displays a saved sigil at any size.
 * STATUS: stub · server component
 *
 * Props (planned): { sigil: Pick<Sigil, "imageData" | "name" | "isCharged" |
 * "chargedEmotion">; size?: "thumb" | "page" | "ritual" }
 * Renders the PNG imageData (later: object-storage URL — DATA_MODEL open
 * question) with charge-state glow (emotion color from types EMOTIONS map).
 * The single way sigils are displayed everywhere — thumb, sigil page,
 * ritual backdrop, map popup.
 *
 * @see docs/features/grimoire.md, docs/features/charge-destroy.md
 */
export function SigilRenderer() {
  return <div>SigilRenderer (stub)</div>;
}
