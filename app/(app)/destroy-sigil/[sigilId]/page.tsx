/**
 * Destroy ritual page.
 * STATUS: stub
 * Route: /destroy-sigil/[sigilId] · client-heavy page (OGL WebGL)
 *
 * What goes here (M3 placeholder → M5 real ritual):
 * - Load the sigil (owner only). In-fiction confirm step — destruction is
 *   completion, and it's irreversible.
 * - Mounts <DestroyRitual> (components/destroy): <EmotionPicker> (shared with
 *   charge), then <EvilEye> + <GhostCursor> ceremony; on completion
 *   DELETE /api/sigils/[id] (status → DESTROYED, slot freed, destroyCount++),
 *   then route home.
 *
 * v1 reference: git show main:src/components/SigilRoomHome/DestroySigil/SigilDestroy.tsx
 * @see docs/features/charge-destroy.md
 */
export default async function DestroySigilPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = await params;
  return <main className="p-8">destroy ritual for sigil {sigilId} (stub)</main>;
}
