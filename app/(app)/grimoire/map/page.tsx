"use client";

/**
 * Sigil map — every placed sigil in the shared world.
 * STATUS: implemented
 * Route: /grimoire/map · client-heavy page (Mapbox GL)
 *
 * Fetches placed sigils from GET /api/sigils?scope=all|mine and renders them
 * on a WorldMap. Tab bar (All/Mine) re-fetches with the appropriate scope.
 * The grimoire tab bar / book shell is provided by the parent layout.
 *
 * @see docs/features/map.md
 */
import { useState, useEffect } from "react";
import { WorldMap } from "@/components/map/WorldMap";
import type { MapSigil } from "@/lib/mapbox";

type Scope = "all" | "mine";

export default function MapPage() {
  const [scope, setScope] = useState<Scope>("all");
  const [sigils, setSigils] = useState<MapSigil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/sigils?scope=${scope}&status=active`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { data?: MapSigil[] };
        setSigils(json.data ?? []);
      })
      .catch((e: unknown) => {
        console.error("Map fetch error:", e);
        setError("Could not load sigils.");
      })
      .finally(() => setLoading(false));
  }, [scope]);

  return (
    <div className="flex h-full flex-col">
      {/* Scope toggle */}
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-2">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400">
          World Map
        </h2>
        <div className="flex rounded-full border border-zinc-700 overflow-hidden text-xs">
          {(["all", "mine"] as Scope[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScope(s)}
              className={
                "px-4 py-1.5 transition " +
                (scope === s
                  ? "bg-violet-700 text-white"
                  : "text-zinc-400 hover:text-zinc-200")
              }
            >
              {s === "all" ? "All sigils" : "Mine"}
            </button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/60">
            <span className="text-sm text-zinc-400">Loading sigils…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}
        <WorldMap mode="view" sigils={sigils} />
      </div>
    </div>
  );
}
