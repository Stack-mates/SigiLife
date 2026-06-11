/**
 * Library — the user's sigil collection (right grimoire page).
 * STATUS: stub
 * Route: /grimoire/library?pick=charge|destroy&view=active|completed
 *
 * What goes here (M3):
 * - Server component: fetch own sigils (prisma; status from ?view, default
 *   active). Grid of <SigilThumb> (components/sigil).
 * - Normal mode: thumb → /grimoire/sigil/[id].
 * - Pick mode (?pick=...): entered from The Office's Charge/Destroy hotspots;
 *   thumb → /charge-sigil/[id] or /destroy-sigil/[id].
 * - "Completed" view shows DESTROYED sigils (the record of finished work —
 *   new in rebuild, v1 lost these).
 *
 * v1 reference: git show main:src/components/.../SigiLibrary/SigiLibrary.tsx
 * @see docs/features/grimoire.md
 */
export default function LibraryPage() {
  return <main className="p-8">library (stub)</main>;
}
