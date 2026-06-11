/**
 * GrimoireBook — the open-spellbook frame around grimoire pages.
 * STATUS: stub · server component
 *
 * Props (planned): { left?: React.ReactNode; right?: React.ReactNode;
 * children?: React.ReactNode (single-page content like map/sigil detail) }
 * Book art from public/art (Bookshelf/Grimoire Lino assets); ribbon-bookmark
 * tab nav (map/library/profile/friends/settings); responsive: spread in
 * landscape, stacked single pages in portrait.
 *
 * v1 reference: git show main:src/components/SigilRoomHome/Grimoire/Grimoire.tsx
 * @see docs/features/grimoire.md
 */
export function GrimoireBook({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}
