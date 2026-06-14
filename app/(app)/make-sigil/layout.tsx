"use client";

/**
 * Make Sigil wizard shell — holds the draft across write → draw → style.
 * STATUS: implemented
 *
 * Mounts MakeSigilProvider (draft survives step navigation + refresh via
 * sessionStorage) and renders the step indicator. Step guards live in the
 * step pages. Dark, ritual-leaning chrome; the canvas page is the star.
 *
 * @see docs/features/make-sigil.md
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MakeSigilProvider } from "@/context/MakeSigilProvider";

const STEPS = [
  { href: "/make-sigil/write", label: "Write" },
  { href: "/make-sigil/draw", label: "Draw" },
  { href: "/make-sigil/style", label: "Style" },
] as const;

function StepIndicator() {
  const pathname = usePathname();
  const activeIndex = STEPS.findIndex((s) => pathname.startsWith(s.href));

  return (
    <nav aria-label="Sigil creation steps" className="flex items-center justify-center gap-2 pb-4 pt-16">
      {STEPS.map((step, i) => {
        const state = i === activeIndex ? "active" : i < activeIndex ? "done" : "todo";
        return (
          <div key={step.href} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-8 bg-zinc-700" aria-hidden />}
            <Link
              href={step.href}
              aria-current={state === "active" ? "step" : undefined}
              className={
                "rounded-full px-3 py-1 text-sm tracking-wide transition-colors " +
                (state === "active"
                  ? "bg-violet-600 text-white"
                  : state === "done"
                    ? "text-violet-300 hover:text-violet-200"
                    : "text-zinc-500 pointer-events-none")
              }
            >
              {i + 1} · {step.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export default function MakeSigilLayout({ children }: { children: React.ReactNode }) {
  return (
    <MakeSigilProvider>
      <div className="min-h-dvh bg-zinc-950 text-zinc-100">
        <StepIndicator />
        {children}
      </div>
    </MakeSigilProvider>
  );
}
