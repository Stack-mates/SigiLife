/**
 * The Office — home hub.
 * STATUS: stub
 * Route: /home · Auth: gated by (app)/layout
 *
 * What goes here (M1 shell, art hotspots wired as milestones land):
 * - Full-screen Office room illustration (public/art) via <PageShell>.
 * - Four art hotspots (links styled into the room scene):
 *     Make Sigil    → /make-sigil          (desk/altar art)
 *     Charge Sigil  → /grimoire/library?pick=charge   (altar)
 *     Destroy Sigil → /grimoire/library?pick=destroy  (evil-eye door)
 *     Grimoire      → /grimoire            (bookshelf art)
 * - Slot awareness: a subtle <SlotMeter> (components/premium) when near cap.
 * - First-visit tutorial trigger (Harper intro — docs/features/tutorial.md).
 *
 * v1 reference: git show main:src/components/SigilRoomHome/HomeRoom.tsx
 * @see docs/PRODUCT_SPEC.md (screen 3), docs/GLOSSARY.md (The Office)
 */
export default function HomePage() {
  return <main className="p-8">The Office (stub)</main>;
}
