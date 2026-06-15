/**
 * Card — the glasscard surface primitive.
 * STATUS: implemented (M1)
 *
 * The single frosted-glass panel used everywhere over room/map art (the v1
 * .glasscard, re-skinned to the rebuild's dark zinc palette): translucent
 * zinc, backdrop blur, soft border, generous rounding. This is the one
 * implementation — no ad-hoc backdrop-blur divs elsewhere.
 *
 * Server-safe and presentational: no "use client", no hooks. The caller's
 * `className` is appended after the base classes so any utility can be
 * overridden or extended (e.g. padding, max-width, layout).
 *
 * v1 reference: .glasscard in main:src/index.css
 * @see docs/CONVENTIONS.md
 */

const BASE_CLASSES =
  "rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  const classes = [BASE_CLASSES, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
