"use client";

/**
 * Place Sigil — choose/update a sigil's real-world map anchor.
 * STATUS: implemented
 * Route: /place-sigil/[sigilId] · client-heavy page (Mapbox GL) · owner only
 *
 * Loads the sigil name, shows WorldMap in place mode, then PATCHes
 * /api/sigils/[id] with {locationName, latitude, longitude} on confirm
 * and redirects back to the sigil detail page.
 *
 * @see docs/features/map.md
 */
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WorldMap } from "@/components/map/WorldMap";

type SigilMeta = { id: string; name: string };

export default function PlaceSigilPage({
  params,
}: {
  params: Promise<{ sigilId: string }>;
}) {
  const { sigilId } = use(params);
  const router = useRouter();

  const [sigil, setSigil] = useState<SigilMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sigils/${sigilId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as {
          data?: { id: string; name: string };
        };
        const d = json.data;
        if (d) setSigil({ id: d.id, name: d.name });
      })
      .catch((e: unknown) => {
        console.error("PlaceSigilPage load error:", e);
        setError("Could not load sigil.");
      })
      .finally(() => setLoading(false));
  }, [sigilId]);

  const handlePlace = async (loc: { lat: number; lng: number; name: string }) => {
    setPlacing(true);
    setError(null);
    try {
      const res = await fetch(`/api/sigils/${sigilId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationName: loc.name,
          latitude: loc.lat,
          longitude: loc.lng,
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: { message?: string } };
        throw new Error(json.error?.message ?? `HTTP ${res.status}`);
      }
      router.push(`/grimoire/sigil/${sigilId}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to place sigil.";
      setError(msg);
      setPlacing(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-zinc-950">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <Link
          href={`/grimoire/sigil/${sigilId}`}
          className="text-sm text-zinc-500 hover:text-zinc-300 transition"
        >
          ← Cancel
        </Link>
        <h1 className="text-sm font-medium text-zinc-200">
          {loading ? "Loading…" : sigil ? `Place "${sigil.name}" in the world` : "Place sigil"}
        </h1>
      </header>

      {error && (
        <div className="shrink-0 bg-red-950/60 px-4 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Map */}
      <div className="relative flex-1">
        {placing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-950/70">
            <span className="text-sm text-violet-300">Placing sigil…</span>
          </div>
        )}
        {!loading && (
          <WorldMap mode="place" onPlace={handlePlace} />
        )}
      </div>
    </div>
  );
}
