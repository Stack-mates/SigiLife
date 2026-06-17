/**
 * (app) layout — global chrome for the signed-in app.
 * STATUS: implemented — tutorial (M6) + Menu + the auth gate (M1).
 *
 * Gate behaviour:
 * - A real session whose user has no username → /create-profile (onboarding).
 * - No session AND process.env.AUTH_ENFORCED === "true" (prod) → "/" (landing).
 *   While unenforced (dev), the lib/auth dev-identity fallback keeps every
 *   (app) route open so local dev + E2E run without signing in.
 *
 * v1 reference: git show main:src/components/LogInAuth/ProtectedRoute.tsx
 * @see docs/features/auth.md, docs/features/tutorial.md, lib/auth.ts
 */
import { redirect } from "next/navigation";
import { TutorialProvider } from "@/context/TutorialProvider";
import { Menu } from "@/components/layout/Menu";
import { auth } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user && !session.user.username) redirect("/create-profile");
  if (!session?.user && process.env.AUTH_ENFORCED === "true") redirect("/");

  const viewer = session?.user ? { username: session.user.username } : null;

  return (
    <TutorialProvider>
      <Menu viewer={viewer} />
      {children}
    </TutorialProvider>
  );
}
