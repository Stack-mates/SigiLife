/**
 * The Office — home hub.
 * STATUS: implemented (local-first front door)
 * Route: /home
 *
 * The four core actions of the loop. Charge/Destroy route through the library
 * in pick-mode (?pick=...) so the user selects which sigil to act on — the
 * home hub has no sigil context itself. Dedicated Lino button art
 * (WritingButton/GrimoireButton/etc.) can be swapped in after visual review;
 * for now these are clean labeled cards on an atmospheric background.
 *
 * v1 reference: git show main:src/components/SigilRoomHome/HomeRoom.tsx
 * @see docs/PRODUCT_SPEC.md (screen 3), docs/GLOSSARY.md (The Office)
 */
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

const ACTIONS = [
  { href: "/make-sigil", glyph: "✍", title: "Write a Sigil", blurb: "Distill an intention into a symbol." },
  { href: "/grimoire/library?pick=charge", glyph: "✨", title: "Charge", blurb: "Feed a sigil with feeling." },
  { href: "/grimoire/library?pick=destroy", glyph: "🔥", title: "Destroy", blurb: "Close a case. Release its work." },
  { href: "/grimoire", glyph: "📖", title: "Grimoire", blurb: "Your sigils, map, and friends." },
] as const;

export default function HomePage() {
  return (
    <PageShell art="/art/InsideLino.svg">
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-10 px-4 py-12">
        <header className="flex flex-col items-center gap-3 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG logo */}
          <img src="/art/LinoSigiLogo.svg" alt="SigiLife" width={96} height={96} className="opacity-90" />
          <h1 className="font-serif text-3xl tracking-wide text-zinc-50">The Office</h1>
          <p className="text-sm text-zinc-400">What does the work require of you today?</p>
        </header>

        <nav className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {ACTIONS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur transition hover:border-violet-700 hover:bg-zinc-900"
            >
              <span className="text-3xl" aria-hidden>{a.glyph}</span>
              <span className="font-serif text-xl text-zinc-100 group-hover:text-white">{a.title}</span>
              <span className="text-sm text-zinc-400">{a.blurb}</span>
            </Link>
          ))}
        </nav>
      </main>
    </PageShell>
  );
}
