/**
 * SplashCursor — WebGL fluid-dynamics trace effect for the charge ritual.
 * STATUS: stub · "use client" · WebGL canvas, no SSR
 *
 * Props (planned): { color: string (emotion color); intensity?: number;
 * onActivity?: (amount: number) => void } — activity feeds the ritual's
 * completion meter in ChargeRitual.
 * v1 contains a COMPLETE working fluid simulation (shaders, pointer
 * handling). PORT it, don't rewrite: adapt to props, add cleanup on unmount,
 * cap resolution on mobile to hold 60fps (degrade particles, not framerate).
 *
 * v1 reference: git show main:src/components/.../ChargeComponents/SplashCursor.tsx
 * @see docs/features/charge-destroy.md
 */
export function SplashCursor() {
  return null;
}
