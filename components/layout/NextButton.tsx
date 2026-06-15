"use client";

/**
 * NextButton — wizard step navigation button.
 * STATUS: implemented · "use client"
 *
 * Props: { href?: string; onClick?: () => void; disabled?: boolean;
 * direction?: "next" | "back"; children }
 * Used by the make-sigil wizard steps; disabled until the step is valid
 * (e.g. write step requires a non-empty, filter-passing intention).
 *
 * Renders a next/link when `href` is set and not disabled (so the row is a
 * real, prefetchable navigation); otherwise a <button> (for onClick handlers
 * or the disabled state, since a disabled <a> is not a thing). Styling reuses
 * the shared Button primitive's classes so it matches the violet design system.
 * A directional arrow affordance is added: → for "next", ← for "back".
 *
 * v1 reference: git show main:src/components/Parts/NextButton.tsx
 * @see docs/features/make-sigil.md
 */
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export interface NextButtonProps {
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  direction?: "next" | "back";
  children?: React.ReactNode;
}

// Mirrors the Button primitive's class string so the Link variant looks
// identical to the rendered <button> (hand-rolled concat — no clsx, ADR-006).
const LINK_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "px-5 py-2.5 text-base bg-violet-600 text-white transition active:scale-95 " +
  "hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export function NextButton({
  href,
  onClick,
  disabled = false,
  direction = "next",
  children,
}: NextButtonProps) {
  const arrow = direction === "back" ? "←" : "→";
  const label = children ?? (direction === "back" ? "Back" : "Next");

  const content =
    direction === "back" ? (
      <>
        <span aria-hidden>{arrow}</span>
        {label}
      </>
    ) : (
      <>
        {label}
        <span aria-hidden>{arrow}</span>
      </>
    );

  // A real link only when navigable: href present AND enabled.
  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick} className={LINK_CLASSES}>
        {content}
      </Link>
    );
  }

  return (
    <Button onClick={onClick} disabled={disabled} aria-disabled={disabled}>
      {content}
    </Button>
  );
}
