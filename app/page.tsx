/**
 * Landing page — public entry point.
 * STATUS: implemented (real Google sign-in + dev "Enter" while unenforced)
 * Route: /
 *
 * Signed-in visitors skip straight to /home. Otherwise: the pitch, a Google
 * sign-in button (Auth.js), and — while AUTH_ENFORCED is off — the dev "Enter
 * the Office" shortcut that rides the dev-identity fallback (also what the E2E
 * smoke test clicks). When enforced (prod), only the Google button shows.
 *
 * v1 reference: git show main:src/components/LogInAuth/LandingPage.tsx
 * @see docs/features/auth.md, docs/PRODUCT_SPEC.md
 */
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) redirect("/home");

  const enforced = process.env.AUTH_ENFORCED === "true";

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

        <div className="flex flex-col items-center gap-3">
          <GoogleSignInButton />
          {!enforced && (
            <Link
              href="/home"
              className="rounded-full bg-violet-600 px-8 py-3.5 font-medium text-white transition hover:bg-violet-500"
            >
              Enter the Office
            </Link>
          )}
        </div>

        <p className="text-xs text-zinc-600">
          {enforced
            ? "Sign in to begin. Your work follows you between devices."
            : "Sign in to keep your work across devices — or enter as the dev agent for now."}
        </p>
      </main>
    </PageShell>
  );
}
