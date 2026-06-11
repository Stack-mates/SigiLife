/**
 * NextButton — wizard step navigation button.
 * STATUS: stub · "use client" when implemented
 *
 * Props (planned): { href?: string; onClick?: () => void; disabled?: boolean;
 * direction?: "next" | "back"; children }
 * Used by the make-sigil wizard steps; disabled until the step is valid
 * (e.g. write step requires a non-empty, filter-passing intention).
 *
 * v1 reference: git show main:src/components/Parts/NextButton.tsx
 * @see docs/features/make-sigil.md
 */
export function NextButton({ children }: { children?: React.ReactNode }) {
  return <button type="button">{children ?? "Next"}</button>;
}
