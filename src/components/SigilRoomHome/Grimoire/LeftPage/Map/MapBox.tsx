import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

import MapSearchBox from "./MapSearchBox"
import { useUser } from "@/context/UserContext"
import Menu from '../../../../Parts/Menu';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

type VoteType = "charge" | "destroy";

type Sigil = {
  id: number;
  name: string;
  intention?: string;
  imageData?: string;
  locationName?: string;
  latitude?: number | string;
  longitude?: number | string;
  chargeScore: number;
  destroyScore: number;
  userVote: VoteType | null;
  isCharged?: boolean;
};

const DEFAULT_VIEW = { longitude: -95.7129, latitude: 37.0902, zoom: 3.5 };

function getInitialViewState(user: any) {
  if (user?.homeLocation) {
    try {
      const parsed = typeof user.homeLocation === 'string'
        ? JSON.parse(user.homeLocation)
        : user.homeLocation;
      const lat = Number(parsed.latitude);
      const lng = Number(parsed.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { latitude: lat, longitude: lng, zoom: 11 };
      }
    } catch {
      // fall through to default
    }
  }
  return DEFAULT_VIEW;
}

export default function MapBox() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [sigils, setSigils] = useState<Sigil[]>([]);
  const [popupInfo, setPopupInfo] = useState<Sigil | null>(null);
  const [filterMode, setFilterMode] = useState<"all" | "mine">("all");
  const [voting, setVoting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize from user's home sigil location, fall back to US center
  const [viewState, setViewState] = useState(() => getInitialViewState(user));

  // If user loads async after mount, sync the map to their home location
  useEffect(() => {
    if (user?.homeLocation) {
      setViewState(getInitialViewState(user));
    }
  }, [user?.id]); // only re-center when user identity changes, not on every render

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  useEffect(() => {
    if (!user) return;
    const url = filterMode === "all"
      ? '/api/sigils/allsigils'
      : `/api/sigils/user/${user.id}/sigils`;

    axios.get(url)
      .then(res => setSigils(res.data))
      .catch(err => console.error("Error fetching sigils for map:", err));
  }, [user?.id, filterMode]);

  const handleVote = async (voteType: VoteType) => {
    if (!popupInfo || !user || voting) return;
    setVoting(true);
    try {
      const res = await axios.post(`/api/sigils/${popupInfo.id}/vote`, { voteType });
      const { chargeScore, destroyScore, userVote } = res.data;

      // Update the sigil in the list
      setSigils(prev =>
        prev.map(s =>
          s.id === popupInfo.id ? { ...s, chargeScore, destroyScore, userVote } : s
        )
      );
      // Update the open popup
      setPopupInfo(prev =>
        prev ? { ...prev, chargeScore, destroyScore, userVote } : null
      );
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setVoting(false);
    }
  };

  if (!user) return null;

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="mapbox art-page-base">
          <Menu />
          <div style={{
            width: '88dvw',
            height: '88dvh',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative',
            zIndex: 55,
          }}>
            <div style={{
              width: '100%',
              flex: '3',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '2px solid #a855f7',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              minHeight: 0,
            }}>
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
              >
                {sigils.map((sigil) => {
                  if (sigil.longitude && sigil.latitude) {
                    return (
                      <Marker
                        key={`marker-${sigil.id}`}
                        longitude={Number(sigil.longitude)}
                        latitude={Number(sigil.latitude)}
                        anchor="bottom"
                        onClick={e => {
                          e.originalEvent.stopPropagation();
                          setPopupInfo(sigil);
                        }}
                      >
                        <div className="cursor-pointer">
                          {sigil.imageData ? (
                            <img
                              src={sigil.imageData}
                              alt={sigil.name}
                              className={`w-8 h-8 object-cover rounded-full border-2 border-purple-500 bg-black/50 ${sigil.isCharged ? 'sigil-charging' : ''}`}
                            />
                          ) : (
                            <div className={`w-6 h-6 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs ${sigil.isCharged ? 'sigil-charging' : ''}`}>✧</div>
                          )}
                        </div>
                      </Marker>
                    );
                  }
                  return null;
                })}

                {popupInfo && (
                  <Popup
                    anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}
                    maxWidth="320px"
                    style={{ borderRadius: "16px" }}
                  >
                    {/* Popup inner — override Mapbox's default white/tiny style */}

                    {/* Header */}
                    <h3 style={{
                      margin: '0 0 4px',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#d8b4fe',
                      textAlign: 'center',
                    }}>
                      {popupInfo.name}
                    </h3>

                    {popupInfo.locationName && (
                      <p style={{ margin: '0 0 10px', fontSize: '0.75rem', color: '#a78bfa', textAlign: 'center' }}>
                        📍 {popupInfo.locationName}
                      </p>
                    )}

                    {/* Sigil image */}
                    {popupInfo.imageData && (
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 10px' }}>
                        <img
                          src={popupInfo.imageData}
                          alt="Sigil"
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '2px solid rgba(168, 85, 247, 0.6)',
                          }}
                        />
                      </div>
                    )}

                    {/* Intention */}
                    <p style={{
                      margin: '0 0 14px',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                      color: '#e9d5ff',
                      textAlign: 'center',
                      lineHeight: '1.4',
                    }}>
                      "{popupInfo.intention || 'A mysterious sigil...'}"
                    </p>

                    {/* Charge / Destroy vote buttons */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <button
                        onClick={() => handleVote("charge")}
                        disabled={voting}
                        style={{
                          flex: 1,
                          padding: '8px 0',
                          borderRadius: '8px',
                          border: popupInfo.userVote === "charge"
                            ? '2px solid #a855f7'
                            : '2px solid rgba(168, 85, 247, 0.3)',
                          background: popupInfo.userVote === "charge"
                            ? 'rgba(168, 85, 247, 0.35)'
                            : 'rgba(168, 85, 247, 0.1)',
                          color: popupInfo.userVote === "charge" ? '#e9d5ff' : '#c4b5fd',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: voting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s ease',
                          opacity: voting ? 0.6 : 1,
                        }}
                        title={popupInfo.userVote === "charge" ? "Remove charge vote" : "Charge this sigil"}
                      >
                        ✨ Charge&nbsp;&nbsp;{popupInfo.chargeScore}
                      </button>

                      <button
                        onClick={() => handleVote("destroy")}
                        disabled={voting}
                        style={{
                          flex: 1,
                          padding: '8px 0',
                          borderRadius: '8px',
                          border: popupInfo.userVote === "destroy"
                            ? '2px solid #ef4444'
                            : '2px solid rgba(239, 68, 68, 0.3)',
                          background: popupInfo.userVote === "destroy"
                            ? 'rgba(239, 68, 68, 0.25)'
                            : 'rgba(239, 68, 68, 0.08)',
                          color: popupInfo.userVote === "destroy" ? '#fca5a5' : '#f87171',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          cursor: voting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s ease',
                          opacity: voting ? 0.6 : 1,
                        }}
                        title={popupInfo.userVote === "destroy" ? "Remove destroy vote" : "Destroy this sigil"}
                      >
                        🔥 Destroy&nbsp;&nbsp;{popupInfo.destroyScore}
                      </button>
                    </div>

                    {/* View in Real World */}
                    <button
                      style={{
                        width: '100%',
                        padding: '9px 0',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: 'none',
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                      }}
                      onClick={() => navigate('/place-sigil-world', { state: { sigilData: popupInfo } })}
                    >
                      View in Real World →
                    </button>

                  </Popup>
                )}

                <NavigationControl position="bottom-right" />
              </Map>
            </div>

            {/* Controls row */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MapSearchBox
                accessToken={MAPBOX_TOKEN}
                onRetrieve={(res) => {
                  if (res.features && res.features.length > 0) {
                    const [lng, lat] = res.features[0].geometry.coordinates;
                    setViewState({ ...viewState, longitude: lng, latitude: lat, zoom: 14 });
                  }
                }}
              />
              <button
                style={{ borderRadius: "12px", margin: "0" }}
                onClick={() => setFilterMode("all")}
                className={`px-4 py-2 rounded-md font-bold transition-colors ${filterMode === "all" ? "bg-purple-600 text-white" : "bg-zinc-800 text-purple-300 border border-purple-600"}`}
              >
                All Sigils
              </button>
              <button
                style={{ borderRadius: "12px", margin: "0" }}
                onClick={() => setFilterMode("mine")}
                className={`px-4 py-2 rounded-md font-bold transition-colors ${filterMode === "mine" ? "bg-purple-600 text-white" : "bg-zinc-800 text-purple-300 border border-purple-600"}`}
              >
                My Sigils
              </button>
            </div>

            {/* Feed card */}
            <div className="flex flex-col bg-white/10 backdrop-blur-xl p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20"
              style={{ flex: '1', minHeight: 0, overflowY: 'auto' }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}