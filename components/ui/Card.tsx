/**
 * Card — the glasscard surface primitive.
 * STATUS: stub (M1)
 *
 * The frosted-glass panel used everywhere over room art: translucent white,
 * blur, soft border (v1 .glasscard). Should be the single implementation —
 * no ad-hoc backdrop-blur divs elsewhere.
 *
 * v1 reference: .glasscard in main:src/index.css
 * @see docs/CONVENTIONS.md
 */
export function Card({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}
