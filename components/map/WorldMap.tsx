"use client";

/**
 * WorldMap — the shared Mapbox map (view mode + placement mode).
 * STATUS: implemented
 *
 * Props:
 *   mode: "view" — render sigil markers; "place" — drop-a-pin placement flow
 *   sigils?: MapSigil[] — markers to render (view mode)
 *   initialCenter?: [lng, lat] — optional starting center
 *   onPlace?: ({lat, lng, name}) => void — called when pin is confirmed (place mode)
 *
 * Dynamically imported (no SSR) because mapbox-gl is browser-only.
 *
 * @see docs/features/map.md
 */
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { MapSigil } from "@/lib/mapbox";
import { MAP_DEFAULTS, MAPBOX_TOKEN } from "@/lib/mapbox";
import { SigilMarker } from "./SigilMarker";
import { MapSearchBox } from "./MapSearchBox";
import "mapbox-gl/dist/mapbox-gl.css";

// Dynamically import the react-map-gl Map to avoid SSR issues with mapbox-gl
const Map = dynamic(
  () => import("react-map-gl/mapbox").then((m) => m.Map),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-map-gl/mapbox").then((m) => m.Marker),
  { ssr: false }
);

type PlaceLocation = { lat: number; lng: number; name: string };

type WorldMapProps = {
  mode: "view" | "place";
  sigils?: MapSigil[];
  initialCenter?: [number, number]; // [lng, lat]
  onPlace?: (loc: PlaceLocation) => void;
};

export function WorldMap({ mode, sigils = [], initialCenter, onPlace }: WorldMapProps) {
  const center = initialCenter ?? MAP_DEFAULTS.center;

  // Place mode state
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [pinName, setPinName] = useState<string>("Custom location");
  const [confirmed, setConfirmed] = useState(false);

  const handleMapClick = useCallback(
    (e: { lngLat: { lat: number; lng: number } }) => {
      if (mode !== "place") return;
      setPin({ lat: e.lngLat.lat, lng: e.lngLat.lng });
      setPinName("Custom location");
      setConfirmed(false);
    },
    [mode]
  );

  const handleSearchSelect = useCallback((loc: PlaceLocation) => {
    setPin({ lat: loc.lat, lng: loc.lng });
    setPinName(loc.name);
    setConfirmed(false);
  }, []);

  const handleConfirm = () => {
    if (!pin || !onPlace) return;
    setConfirmed(true);
    onPlace({ lat: pin.lat, lng: pin.lng, name: pinName });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Search box in place mode */}
      {mode === "place" && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            right: 12,
            zIndex: 10,
          }}
        >
          <MapSearchBox
            onSelect={handleSearchSelect}
            placeholder="Search for a location…"
          />
        </div>
      )}

      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: MAP_DEFAULTS.zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_DEFAULTS.style}
        onClick={handleMapClick}
        reuseMaps
      >
        {/* View mode: render all sigil markers */}
        {mode === "view" &&
          sigils
            .filter((s) => s.lat !== 0 || s.lng !== 0)
            .map((sigil) => <SigilMarker key={sigil.id} sigil={sigil} />)}

        {/* Place mode: draggable pin */}
        {mode === "place" && pin && (
          <Marker
            longitude={pin.lng}
            latitude={pin.lat}
            anchor="bottom"
            draggable
            onDragEnd={(e) => {
              setPin({ lat: e.lngLat.lat, lng: e.lngLat.lng });
              setPinName("Custom location");
              setConfirmed(false);
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50% 50% 50% 0",
                transform: "rotate(-45deg)",
                background: "#7c3aed",
                border: "2px solid #a78bfa",
                boxShadow: "0 0 12px rgba(139,92,246,0.8)",
                cursor: "grab",
              }}
            />
          </Marker>
        )}
      </Map>

      {/* Place mode: crosshair hint (shown before pin is dropped) */}
      {mode === "place" && !pin && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 5,
            textAlign: "center",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 4 }}>＋</div>
          <span>Tap to drop a pin</span>
        </div>
      )}

      {/* Place mode: confirm overlay */}
      {mode === "place" && pin && !confirmed && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
              background: "rgba(0,0,0,0.6)",
              padding: "4px 10px",
              borderRadius: 6,
              backdropFilter: "blur(4px)",
            }}
          >
            {pinName}
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              background: "#7c3aed",
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "10px 28px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(124,58,237,0.5)",
            }}
          >
            Place sigil here
          </button>
        </div>
      )}

      {mode === "place" && confirmed && (
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "rgba(0,0,0,0.7)",
            color: "#a78bfa",
            padding: "10px 24px",
            borderRadius: 24,
            fontSize: 14,
            backdropFilter: "blur(4px)",
          }}
        >
          Placing…
        </div>
      )}
    </div>
  );
}
