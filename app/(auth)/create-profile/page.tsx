/**
 * Create Profile — one-time onboarding after first sign-in.
 * STATUS: implemented
 * Route: /create-profile · Auth: acting user (dev shim today)
 *
 * - Loads the current user server-side (lib/auth getCurrentUser) plus the
 *   homeLocation, then renders <ProfileForm mode="onboarding">: username
 *   (unique, checked on submit via CONFLICT), avatar picker, home location
 *   (plain text until MapSearchBox in M4), theme + colorTheme with live preview.
 * - ProfileForm submits PATCH /api/users/[id]; on success it redirects to /home
 *   (the tutorial triggers there — docs/features/tutorial.md).
 *
 * v1 reference: git show main:src/components/LogInAuth/CreateProfile.tsx
 * @see docs/features/auth.md
 */
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/auth/ProfileForm";

type HomeLocation = { lat: number; lng: number; name: string };

export default async function CreateProfilePage() {
  const current = await getCurrentUser();
  const { homeLocation } = await prisma.user.findUniqueOrThrow({
    where: { id: current.id },
    select: { homeLocation: true },
  });

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl text-zinc-50">Shape your grimoire</h1>
        <p className="text-sm text-zinc-400">
          A name, a face, and a palette. You can change these later in settings.
        </p>
      </header>

      <ProfileForm
        mode="onboarding"
        user={{
          id: current.id,
          username: current.username,
          avatar: current.avatar,
          theme: current.theme,
          colorTheme: current.colorTheme,
          homeLocation: (homeLocation as HomeLocation | null) ?? null,
        }}
      />
    </main>
  );
}
