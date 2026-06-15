"use client";

/**
 * ProfileForm — the onboarding form (also reused by settings).
 * STATUS: implemented
 *
 * Props: { user: { id, username, avatar, theme, colorTheme, homeLocation };
 *          mode: "onboarding" | "settings" }
 * Fields:
 * - username (text; CONFLICT on PATCH is the source of truth for uniqueness).
 * - avatar picker (public/Avatar{n}.png — indices 0..N; missing files self-hide).
 * - theme toggle (LIGHT / DARK) and colorTheme toggle (FOLIAGE / CYBER), each
 *   with LIVE preview: setUser() from useUser() re-applies <html> classes
 *   optimistically before the PATCH resolves.
 * - home location: plain text until MapSearchBox lands (M4).
 * Submit → PATCH /api/users/[id].
 *   onboarding → router.push("/home"); settings → inline "Saved" confirmation.
 *
 * v1 reference: git show main:src/components/LogInAuth/CreateProfile.tsx
 * @see docs/features/auth.md
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useUser, type ThemeMode, type ColorTheme } from "@/context/UserProvider";

type HomeLocation = { lat: number; lng: number; name: string } | null;

export type ProfileFormUser = {
  id: string;
  username: string | null;
  avatar: number;
  theme: ThemeMode;
  colorTheme: ColorTheme;
  homeLocation: HomeLocation;
};

// Candidate avatars: index i → /public/Avatar{i+1}.png. Only Avatar1/Avatar2
// ship today (indices 0..1); any extra index self-hides via onError, so adding
// more art files later (and extending this list) needs no other change.
const AVATAR_INDICES = [0, 1];
const avatarSrc = (i: number) => `/Avatar${i + 1}.png`;

export function ProfileForm({
  user,
  mode,
}: {
  user: ProfileFormUser;
  mode: "onboarding" | "settings";
}) {
  const router = useRouter();
  const { setUser } = useUser();

  const [username, setUsername] = useState(user.username ?? "");
  const [avatar, setAvatar] = useState(user.avatar);
  const [theme, setTheme] = useState<ThemeMode>(user.theme);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(user.colorTheme);
  const [homeName, setHomeName] = useState(user.homeLocation?.name ?? "");
  const [hiddenAvatars, setHiddenAvatars] = useState<Set<number>>(new Set());

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Live theme preview: push the toggled value into context so UserProvider
  // re-applies the <html> classes immediately, before any PATCH.
  function previewTheme(next: ThemeMode) {
    setTheme(next);
    setUser({
      id: user.id,
      username,
      avatar,
      theme: next,
      colorTheme,
    });
  }
  function previewColorTheme(next: ColorTheme) {
    setColorTheme(next);
    setUser({
      id: user.id,
      username,
      avatar,
      theme,
      colorTheme: next,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const trimmed = username.trim();
    if (!trimmed) {
      setError("Choose a name for your grimoire.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: trimmed,
          avatar,
          theme,
          colorTheme,
          // homeLocation stays a plain label until MapSearchBox (M4) supplies
          // real coordinates; send null when cleared.
          homeLocation: homeName.trim()
            ? { lat: 0, lng: 0, name: homeName.trim() }
            : null,
        }),
      });
      const payload: { data?: unknown; error?: { code: string; message: string } } =
        await res.json();

      if (!res.ok || payload.error) {
        const message =
          payload.error?.code === "CONFLICT"
            ? "That name is taken — try another."
            : payload.error?.message ?? "Could not save your profile.";
        setError(message);
        return;
      }

      // Commit the saved identity to context (keeps Menu/avatar in sync).
      setUser({ id: user.id, username: trimmed, avatar, theme, colorTheme });

      if (mode === "onboarding") {
        router.push("/home");
        router.refresh();
      } else {
        setSaved(true);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Username */}
      <section className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-xs uppercase tracking-[0.2em] text-zinc-500"
        >
          Name
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          maxLength={100}
          placeholder="your sigil name"
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
        />
      </section>

      {/* Avatar */}
      <section className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Avatar
        </span>
        <div className="flex flex-wrap gap-3">
          {AVATAR_INDICES.filter((i) => !hiddenAvatars.has(i)).map((i) => {
            const active = i === avatar;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Avatar ${i + 1}`}
                aria-pressed={active}
                onClick={() => setAvatar(i)}
                className={
                  "size-16 overflow-hidden rounded-full border-2 transition " +
                  (active
                    ? "border-violet-500 ring-2 ring-violet-500/40"
                    : "border-zinc-700 hover:border-zinc-500")
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc(i)}
                  alt=""
                  className="size-full object-cover"
                  onError={() =>
                    setHiddenAvatars((prev) => new Set(prev).add(i))
                  }
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Home location (plain text until M4) */}
      <section className="flex flex-col gap-2">
        <label
          htmlFor="home"
          className="text-xs uppercase tracking-[0.2em] text-zinc-500"
        >
          Home town
        </label>
        <input
          id="home"
          type="text"
          value={homeName}
          onChange={(e) => setHomeName(e.target.value)}
          placeholder="where your sigils take root"
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
        />
      </section>

      {/* Theme mode */}
      <section className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Mode
        </span>
        <div className="flex gap-2">
          {(["DARK", "LIGHT"] as const).map((m) => (
            <Button
              key={m}
              variant={theme === m ? "primary" : "glass"}
              size="sm"
              onClick={() => previewTheme(m)}
              aria-pressed={theme === m}
            >
              {m === "DARK" ? "Dark" : "Light"}
            </Button>
          ))}
        </div>
      </section>

      {/* Color theme */}
      <section className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Palette
        </span>
        <div className="flex gap-2">
          {(["FOLIAGE", "CYBER"] as const).map((c) => (
            <Button
              key={c}
              variant={colorTheme === c ? "primary" : "glass"}
              size="sm"
              onClick={() => previewColorTheme(c)}
              aria-pressed={colorTheme === c}
            >
              {c === "FOLIAGE" ? "Foliage" : "Cyber"}
            </Button>
          ))}
        </div>
        <span className="accent-text text-sm">
          The {colorTheme === "FOLIAGE" ? "foliage" : "cyber"} palette colours
          your rituals.
        </span>
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      {saved && (
        <p role="status" className="text-sm text-emerald-400">
          Saved.
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={saving}>
        {saving
          ? "Saving…"
          : mode === "onboarding"
            ? "Enter the office"
            : "Save profile"}
      </Button>
    </form>
  );
}
