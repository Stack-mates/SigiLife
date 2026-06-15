/**
 * mapbox — shared map configuration + geocoding helper.
 * STATUS: implemented
 *
 * Exports: MAPBOX_TOKEN, MAP_DEFAULTS, MapSigil type, geocode() helper.
 *
 * @see docs/features/map.md
 */

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!token) {
  throw new Error(
    "NEXT_PUBLIC_MAPBOX_TOKEN is not set. Add it to .env (see .env.example)."
  );
}

export const MAPBOX_TOKEN: string = token;

export const MAP_DEFAULTS = {
  style: "mapbox://styles/mapbox/dark-v11",
  zoom: 2,
  center: [-98, 39] as [number, number],
};

/** The minimal data shape WorldMap needs to render a sigil marker. */
export type MapSigil = {
  id: string;
  name: string;
  imageDataUrl: string | null;
  lat: number;
  lng: number;
  chargeScore: number;
  destroyScore: number;
  ownerUsername: string | null;
};

/** A place result from the Mapbox forward-geocoding API v6. */
export type GeocodedPlace = {
  name: string;
  lat: number;
  lng: number;
};

/**
 * Forward-geocode a free-text query using the Mapbox Search API v6.
 * Returns up to 5 results. Safe to call from the client (uses the public token).
 */
export async function geocode(query: string): Promise<GeocodedPlace[]> {
  if (!query.trim()) return [];

  const url =
    `https://api.mapbox.com/search/geocode/v6/forward` +
    `?q=${encodeURIComponent(query)}&access_token=${MAPBOX_TOKEN}&limit=5`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const json = (await res.json()) as {
    features?: {
      properties?: {
        name_preferred?: string;
        name?: string;
        coordinates?: { latitude?: number; longitude?: number };
      };
    }[];
  };

  if (!Array.isArray(json.features)) return [];

  return json.features
    .map((f) => {
      const p = f.properties ?? {};
      const name = p.name_preferred ?? p.name ?? "";
      const lat = p.coordinates?.latitude ?? 0;
      const lng = p.coordinates?.longitude ?? 0;
      return { name, lat, lng };
    })
    .filter((p) => p.name && (p.lat !== 0 || p.lng !== 0));
}
