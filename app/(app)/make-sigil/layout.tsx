/**
 * Make Sigil wizard shell — holds the draft across write → draw → style.
 * STATUS: stub
 *
 * What goes here (M2):
 * - "use client" + <MakeSigilProvider> (context/) so the draft (intention,
 *   consonants, canvas JSON, style, name, location, shareWith) survives
 *   step navigation. Replaces v1's localStorage juggling.
 * - Step indicator UI (1 Write · 2 Draw · 3 Style) + <NextButton> slot.
 * - Step guards live in the step pages (e.g. /draw bounces to /write if no
 *   intention in the draft).
 *
 * v1 reference: git show main:src/components/SigilRoomHome/MakeSigil/MakeSigil.tsx
 * @see docs/features/make-sigil.md
 */
export default function MakeSigilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
