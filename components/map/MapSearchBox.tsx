"use client";

/**
 * MapSearchBox — location search / geocoder input.
 * STATUS: implemented
 *
 * Props: { onSelect: ({lat, lng, name}) => void; placeholder? }
 * Debounces input 300ms then calls geocode() from lib/mapbox.
 * Shows a dropdown of up to 5 results; selecting one calls onSelect and clears.
 *
 * Used by: place-sigil page (WorldMap place mode), StyleSigil location field,
 * ProfileForm home location.
 *
 * @see docs/features/map.md
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { geocode, type GeocodedPlace } from "@/lib/mapbox";

type Location = { lat: number; lng: number; name: string };

type MapSearchBoxProps = {
  onSelect: (loc: Location) => void;
  placeholder?: string;
};

export function MapSearchBox({
  onSelect,
  placeholder = "Search for a location…",
}: MapSearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodedPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const places = await geocode(q);
      setResults(places);
      setOpen(places.length > 0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, search]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (place: GeocodedPlace) => {
    onSelect({ lat: place.lat, lng: place.lng, name: place.name });
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 backdrop-blur-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          autoComplete="off"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
            …
          </span>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl">
          {results.map((place, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-zinc-800 transition"
              >
                {place.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
