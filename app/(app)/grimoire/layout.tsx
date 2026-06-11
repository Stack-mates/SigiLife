/**
 * Grimoire layout — the open spellbook frame around all grimoire pages.
 * STATUS: stub
 *
 * What goes here (M3):
 * - <GrimoireBook> (components/grimoire): the book art frame (Lino assets),
 *   responsive — two-page spread landscape, stacked pages portrait.
 * - Tab/bookmark navigation between map / library / profile / friends /
 *   settings (in-fiction: ribbon bookmarks).
 *
 * v1 reference: git show main:src/components/SigilRoomHome/Grimoire/Grimoire.tsx
 * @see docs/features/grimoire.md
 */
export default function GrimoireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
