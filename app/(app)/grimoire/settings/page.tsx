"use client";

/**
 * Settings — local-first preferences and maintenance.
 * STATUS: implemented (local-first)
 * Route: /grimoire/settings
 *
 * Honest about the current phase: full theming (foliage/cyber × light/dark)
 * and account controls arrive with the auth/DB milestone. What works today:
 * a maintenance tool to clear locally-kept sigils (useful while there's no
 * server), and a note on motion. Replay-tutorial appears once M6 lands.
 *
 * v1 reference: git show main:src/components/.../Profile/UserSettings.tsx
 * @see docs/features/auth.md
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAllSigils, listSigils } from "@/lib/sigil/localStore";

export default function SettingsPage() {
  const router = useRouter();
  const [count, setCount] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setCount(listSigils().length);
  }, []);

  const handleClear = () => {
    clearAllSigils();
    setCount(0);
    setConfirming(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl text-zinc-50">Settings</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500">Appearance</h2>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-400">
          Theme choices — the foliage and cyber palettes, light and dark — arrive
          with accounts, when your preference can follow you between devices.
          Rituals already respect your system&apos;s reduced-motion setting.
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500">This device</h2>
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <p className="text-sm text-zinc-300">
            {count === null ? "…" : `${count} sigil${count === 1 ? "" : "s"} kept on this device.`}
          </p>
          <p className="text-xs text-zinc-500">
            Until accounts exist, sigils live only in this browser. Clearing them
            cannot be undone.
          </p>
          {confirming ? (
            <div className="flex gap-3">
              <button type="button" onClick={() => setConfirming(false)}
                className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-300 hover:border-zinc-500">
                Cancel
              </button>
              <button type="button" onClick={handleClear}
                className="rounded-full bg-red-800 px-5 py-2 text-sm font-medium text-white hover:bg-red-700">
                Clear everything
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirming(true)} disabled={!count}
              className="self-start rounded-full border border-red-900/60 px-5 py-2 text-sm text-red-400/90 transition enabled:hover:border-red-700 enabled:hover:text-red-300 disabled:opacity-40">
              Clear local sigils
            </button>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-[0.2em] text-zinc-500">About</h2>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-400">
          SigiLife — local-first preview. Accounts, the shared map, and
          premium arrive in later milestones.
        </div>
      </section>
    </div>
  );
}
