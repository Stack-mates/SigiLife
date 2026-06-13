/**
 * Landing page — public entry point.
 * STATUS: implemented (local-first; Google sign-in replaces "Enter" at auth milestone)
 * Route: /
 *
 * The pitch + a way in. Until accounts exist (ADR-009, auth last), "Enter the
 * Office" goes straight to /home; the GoogleSignInButton wires in here when
 * auth lands, and signed-in users will redirect past this page.
 *
 * v1 reference: git show main:src/components/LogInAuth/LandingPage.tsx
 * @see docs/features/auth.md, docs/PRODUCT_SPEC.md
 */
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function LandingPage() {
  return (
    <PageShell art="/art/OutsideLino.svg">
      <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col items-center justify-center gap-8 px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG logo */}
        <img src="/art/SigilifeLogo.svg" alt="SigiLife" width={140} height={140} className="opacity-95" />

        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl tracking-wide text-zinc-50">SigiLife</h1>
          <p className="max-w-md text-balance text-zinc-300">
            Distill your intentions into symbols. Place them in the world.
            Charge them with feeling — and release them when their work is done.
          </p>
        </div>

        <Link
          href="/home"
          className="rounded-full bg-violet-600 px-8 py-3.5 font-medium text-white transition hover:bg-violet-500"
        >
          Enter the Office
        </Link>

        <p className="text-xs text-zinc-600">
          Accounts arrive soon. For now, your work is kept on this device.
        </p>
      </main>
    </PageShell>
  );
}
