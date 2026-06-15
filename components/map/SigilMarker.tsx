"use client";

/**
 * SigilMarker — one sigil on the WorldMap.
 * STATUS: implemented
 *
 * Renders a Marker at [sigil.lng, sigil.lat]. Clicking the marker toggles a
 * Popup with sigil name, owner, charge/destroy scores, and a link to the
 * sigil detail page.
 *
 * @see docs/features/map.md
 */
import { useState } from "react";
import { Marker, Popup } from "react-map-gl/mapbox";
import Link from "next/link";
import type { MapSigil } from "@/lib/mapbox";

type SigilMarkerProps = {
  sigil: MapSigil;
  onOpen?: (id: string) => void;
};

export function SigilMarker({ sigil, onOpen }: SigilMarkerProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup((v) => !v);
    if (onOpen) onOpen(sigil.id);
  };

  return (
    <>
      <Marker longitude={sigil.lng} latitude={sigil.lat} anchor="center">
        <button
          type="button"
          onClick={handleClick}
          aria-label={`Open sigil: ${sigil.name}`}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(139,92,246,0.7)",
            cursor: "pointer",
            boxShadow: "0 0 8px rgba(139,92,246,0.5)",
            background: sigil.imageDataUrl ? "transparent" : "#3b0764",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {sigil.imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sigil.imageDataUrl}
              alt={sigil.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ color: "#a78bfa", fontSize: 14 }}>✦</span>
          )}
        </button>
      </Marker>

      {showPopup && (
        <Popup
          longitude={sigil.lng}
          latitude={sigil.lat}
          anchor="bottom"
          offset={20}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          style={{ maxWidth: 220 }}
        >
          <div
            style={{
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 8,
              padding: "10px 12px",
              color: "#e4e4e7",
              minWidth: 160,
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 2, fontSize: 14 }}>
              {sigil.name}
            </p>
            {sigil.ownerUsername && (
              <p style={{ fontSize: 11, color: "#71717a", marginBottom: 6 }}>
                @{sigil.ownerUsername}
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: 8,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              <span title="Charge votes">✦ {sigil.chargeScore}</span>
              <span title="Destroy votes">🔥 {sigil.destroyScore}</span>
            </div>
            <Link
              href={`/grimoire/sigil/${sigil.id}`}
              style={{
                fontSize: 12,
                color: "#a78bfa",
                textDecoration: "none",
              }}
              onClick={() => setShowPopup(false)}
            >
              View sigil →
            </Link>
          </div>
        </Popup>
      )}
    </>
  );
}
