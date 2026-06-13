"use client";

/**
 * Profile — the agent's standing, computed from the local store.
 * STATUS: implemented (local-first; real account/avatar/home arrive with auth+DB)
 * Route: /grimoire/profile
 *
 * Stats derived from localStore: total crafted, active, charged, closed cases.
 * Username/avatar/home-location and SigiFriends come with the DB milestone.
 *
 * v1 reference: git show main:src/components/.../Profile/UserProfile.tsx
 * @see docs/features/grimoire.md, docs/features/social.md
 */
import { useEffect, useState } from "react";
import { listSigils } from "@/lib/sigil/localStore";

type Stats = { crafted: number; active: number; charged: number; closed: number };

export default function ProfilePage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const all = listSigils();
    setStats({
      crafted: all.length,
      active: all.filter((s) => s.status === "ACTIVE").length,
      charged: all.filter((s) => s.isCharged && s.status === "ACTIVE").length,
      closed: all.filter((s) => s.status === "DESTROYED").length,
    });
  }, []);

  if (!stats) return <div className="py-16 text-center text-zinc-600">Reading your file…</div>;

  const cards: { label: string; value: number; hint: string }[] = [
    { label: "Sigils crafted", value: stats.crafted, hint: "all time" },
    { label: "Active", value: stats.active, hint: "in your library" },
    { label: "Charged", value: stats.charged, hint: "carrying intent" },
    { label: "Cases closed", value: stats.closed, hint: "work completed" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-2 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG avatar placeholder */}
        <img src="/Avatar1.png" alt="" width={72} height={72} className="rounded-full border border-zinc-700" />
        <h1 className="font-serif text-2xl text-zinc-50">Agent</h1>
        <p className="text-xs text-zinc-500">A name and avatar arrive when accounts do.</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <div className="font-serif text-3xl text-violet-300 tabular-nums">{c.value}</div>
            <div className="mt-1 text-sm text-zinc-200">{c.label}</div>
            <div className="text-xs text-zinc-600">{c.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
