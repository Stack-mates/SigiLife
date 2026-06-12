"use client";

/**
 * GrimoireBook — the spellbook shell around all grimoire pages.
 * STATUS: implemented (modern dark shell; Lino art frame is a later polish
 * pass — decision recorded in docs/plans/M3-grimoire.md)
 *
 * Ribbon tabs: Library / Closed cases now; Profile, Map, Friends appear as
 * disabled "soon" ribbons until their milestones (DB era). Active tab from
 * the current route + ?view param.
 *
 * @see docs/features/grimoire.md
 */
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TABS = [
  { label: "Library", href: "/grimoire/library", match: (p: string, v: string | null) => p.startsWith("/grimoire/library") && v !== "completed" },
  { label: "Closed cases", href: "/grimoire/library?view=completed", match: (p: string, v: string | null) => p.startsWith("/grimoire/library") && v === "completed" },
] as const;

const SOON = ["Profile", "Map", "Friends"] as const;

function Ribbons() {
  const pathname = usePathname();
  const view = useSearchParams().get("view");

  return (
    <nav aria-label="Grimoire sections" className="flex flex-wrap items-center justify-center gap-2 pb-6">
      {TABS.map((tab) => {
        const active = tab.match(pathname, view);
        return (
          <Link
            key={tab.label}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={
              "rounded-b-xl px-4 py-2 text-sm tracking-wide transition " +
              (active
                ? "bg-violet-600 text-white shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100")
            }
          >
            {tab.label}
          </Link>
        );
      })}
      {SOON.map((label) => (
        <span key={label} title="Arrives with a later milestone"
          className="cursor-not-allowed rounded-b-xl bg-zinc-900/50 px-4 py-2 text-sm text-zinc-700">
          {label}
        </span>
      ))}
    </nav>
  );
}

export function GrimoireBook({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto w-full max-w-3xl px-4">
        <Suspense fallback={<div className="h-16" />}>
          <Ribbons />
        </Suspense>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]">
          {children}
        </div>
      </div>
    </div>
  );
}
