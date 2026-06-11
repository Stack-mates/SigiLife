/**
 * Sigil page — full detail view of one sigil.
 * STATUS: stub
 * Route: /grimoire/sigil/[sigilId]
 *
 * What goes here (M3):
 * - Server component: fetch sigil + viewer's vote + SigiLites (shares).
 *   Visible to any signed-in user; edit affordances only for the owner.
 * - <SigilRenderer> large image, intention text, created date, charge state
 *   (⚡ + chargedEmotion), location, SigiLites list.
 * - Owner actions: rename (PATCH), charge → /charge-sigil/[id],
 *   destroy → /destroy-sigil/[id], place → /place-sigil/[id].
 * - Community: <VotePanel> (components/map) — ✨ charge / 🔥 destroy votes.
 * - Admin-only (M8): "Place in world" → /ar/[id].
 *
 * v1 reference: git show main:src/components/.../SigiLibrary/SigilPage.tsx
 *   (note: v1 had an opacity-0.20 bug at ~line 131 — don't port it)
 * @see docs/features/grimoire.md
 */
export default async function SigilPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = await params;
  return <main className="p-8">sigil {sigilId} (stub)</main>;
}
