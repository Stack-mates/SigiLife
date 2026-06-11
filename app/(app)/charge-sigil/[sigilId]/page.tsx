/**
 * Charge ritual page.
 * STATUS: stub
 * Route: /charge-sigil/[sigilId] · client-heavy page (WebGL fluid sim)
 *
 * What goes here (M3 placeholder visuals → M5 real ritual):
 * - Load the sigil (owner check — only the owner charges); 404/redirect otherwise.
 * - Mounts <ChargeRitual> (components/charge): <EmotionPicker> first
 *   (Hope/Grief/Relief/Joy/Longing), then the <SplashCursor> fluid-trace
 *   ritual over the sigil render; on completion PATCH /api/sigils/[id]/charge
 *   with the chosen emotion, then offer Home / view sigil.
 * - Full-screen, dark, touch-first; this is the emotional core of the app.
 *
 * v1 reference: git show main:src/components/SigilRoomHome/ChargeSigil/SigilCharge.tsx
 * @see docs/features/charge-destroy.md
 */
export default async function ChargeSigilPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = await params;
  return <main className="p-8">charge ritual for sigil {sigilId} (stub)</main>;
}
