/**
 * EmotionPicker — choose the ritual emotion. Shared by charge AND destroy.
 * STATUS: stub · "use client"
 *
 * Props (planned): { onPick: (emotion: Emotion) => void; ritual: "charge" | "destroy" }
 * Five options (Hope, Grief, Relief, Joy, Longing) with their colors from
 * the EMOTIONS map in types/ — the single emotion→color source shared with
 * SplashCursor and SigilRenderer.
 *
 * v1 reference: git show main:src/components/.../ChargeComponents/ChangeEmotion.tsx
 * @see docs/features/charge-destroy.md
 */
export function EmotionPicker() {
  return <div>EmotionPicker (stub)</div>;
}
