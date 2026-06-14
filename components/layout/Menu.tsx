"use client";

/**
 * Menu — global navigation, mounted by (app)/layout.
 * STATUS: implemented
 *
 * A fixed corner toggle that opens a panel of links. Hidden on the immersive
 * ritual routes (charge/destroy) so it never breaks the ceremony. Sign-out
 * lands with real auth (the last milestone); for now it's pure navigation.
 *
 * v1 reference: git show main:src/components/Parts/Menu.tsx
 * @see docs/COMPONENT_MAP.md
 */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/home", label: "The Office" },
  { href: "/make-sigil", label: "Write a Sigil" },
  { href: "/grimoire/library", label: "Library" },
  { href: "/grimoire/profile", label: "Profile" },
  { href: "/grimoire/settings", label: "Settings" },
] as const;

export function Menu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Stay out of the way during the rituals.
  if (pathname.startsWith("/charge-sigil") || pathname.startsWith("/destroy-sigil")) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed left-4 top-4 z-[90] grid size-10 place-items-center rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-200 backdrop-blur transition hover:border-zinc-500"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[88] bg-black/50" aria-hidden onClick={() => setOpen(false)} />
          <nav className="fixed left-0 top-0 z-[89] flex h-dvh w-64 max-w-[80vw] flex-col gap-1 border-r border-zinc-800 bg-zinc-950/95 p-4 pt-16 backdrop-blur">
            {LINKS.map((l) => {
              const active = l.href === "/home" ? pathname === "/home" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    "rounded-xl px-4 py-3 text-sm transition " +
                    (active ? "bg-violet-600 text-white" : "text-zinc-300 hover:bg-zinc-800")
                  }
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </>
  );
}
