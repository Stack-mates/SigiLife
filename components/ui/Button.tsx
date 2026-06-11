/**
 * Button — base button primitive.
 * STATUS: stub (M1)
 *
 * Variants (planned, from the v1 design system): "pink" (primary,
 * .pinkbutton purple), "glass" (.glassbutton), "ghost". Sizes sm/md/lg.
 * Build shadcn-style (cva variants) or hand-rolled — decide at M1 and note
 * in DECISIONS.md if shadcn/radix deps are added (ADR-006).
 *
 * v1 reference: .pinkbutton/.glassbutton in main:src/index.css,
 *   main:src/components/ui/button.tsx
 * @see docs/CONVENTIONS.md
 */
export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
