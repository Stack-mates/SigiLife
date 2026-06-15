/**
 * Button — base button primitive.
 * STATUS: implemented (M1)
 *
 * Variants ported from the v1 design system: "primary" (the .pinkbutton
 * call-to-action, re-skinned to the rebuild's violet palette), "glass"
 * (.glassbutton — translucent zinc + backdrop blur), "ghost" (transparent,
 * fills on hover). Sizes sm/md/lg. Hand-rolled string-concat variants (no
 * cva/clsx/tailwind-merge — those are deps we don't have, see ADR-006):
 * variant classes come first, the caller's `className` is appended last so
 * callers can override/extend any utility.
 *
 * Server-safe and presentational: no "use client", no hooks. It forwards
 * onClick and every other native button prop straight through, so it works
 * inside client components without itself being one.
 *
 * v1 reference: .pinkbutton/.glassbutton in main:src/index.css,
 *   main:src/components/ui/button.tsx
 * @see docs/CONVENTIONS.md
 */

type ButtonVariant = "primary" | "glass" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-violet-600 text-white hover:bg-violet-500",
  glass:
    "bg-zinc-900/60 text-zinc-100 border border-zinc-700 backdrop-blur hover:bg-zinc-800/70 hover:border-zinc-500",
  ghost: "bg-transparent text-zinc-200 hover:bg-zinc-800",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition active:scale-95 disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
