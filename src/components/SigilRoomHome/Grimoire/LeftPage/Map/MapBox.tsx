import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Map, { NavigationControl, Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

import MapSearchBox from "./MapSearchBox"
import { useUser } from "@/context/UserContext"
import Menu from '../../../../Parts/Menu';
import UserFeed from './UserFeed';

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
  creatorUsername?: string;
  creatorId?: number;
};

const DEFAULT_VIEW = { longitude: -95.7129, latitude: 37.0902, zoom: 6 };

function getInitialViewState(user: any) {
  if (user?.homeLocation) {
    try {
      const parsed = typeof user.homeLocation === 'string'
        ? JSON.parse(user.homeLocation)
        : user.homeLocation;
      const lat = Number(parsed.latitude);
      const lng = Number(parsed.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { latitude: lat, longitude: lng, zoom: 13 };
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
  const [dims, setDims] = useState({ width: 2160, height: 1260 });
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set());
  const [following, setFollowing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [characterPopup, setCharacterPopup] = useState<{ label: string; longitude: number; latitude: number } | null>(null);

  const allowPublicFollows = true;

  const [viewState, setViewState] = useState(() => getInitialViewState(user));

  useEffect(() => {
    if (user?.homeLocation) {
      setViewState(getInitialViewState(user));
    }
  }, [user?.id]);

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 }, 50)
  }, [dims])

  useEffect(() => {
    if (!user) return;
    const url = filterMode === "all"
      ? '/api/sigils/allsigils'
      : `/api/sigils/user/${user.id}/sigils`;

    axios.get(url)
      .then(res => setSigils(res.data))
      .catch(err => console.error("Error fetching sigils for map:", err));
  }, [user?.id, filterMode]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/users/${user.id}/following`)
      .then(res => res.json())
      .then(data => setFollowingIds(new Set(data.map((u: any) => u.id))))
      .catch(err => console.error("Error fetching following:", err));
  }, [user?.id]);

  const handleVote = async (voteType: VoteType) => {
    if (!popupInfo || !user || voting) return;
    setVoting(true);
    try {
      const res = await axios.post(`/api/sigils/${popupInfo.id}/vote`, { voteType });
      const { chargeScore, destroyScore, userVote } = res.data;
      setSigils(prev =>
        prev.map(s =>
          s.id === popupInfo.id ? { ...s, chargeScore, destroyScore, userVote } : s
        )
      );
      setPopupInfo(prev =>
        prev ? { ...prev, chargeScore, destroyScore, userVote } : null
      );
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setVoting(false);
    }
  };

  const handleFollow = async (targetId: number) => {
    if (!user || following) return;
    setFollowing(true);
    try {
      await fetch(`/api/users/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: user.id, followingId: targetId })
      });
      setFollowingIds(prev => new Set(prev).add(targetId));
    } catch (err) {
      console.error("Follow failed:", err);
    } finally {
      setFollowing(false);
    }
  };

  if (!user) return null;

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="mapbox art-page-base"
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <div className='rowbox' style={{width: '5dvh', right: '10dvh'}}>
            <button className="btn" onClick={() => setFilterMode("all")} style={{ opacity: filterMode === "all" ? 1 : 0.5 }}>All Sigils</button>
            <button className="btn" onClick={() => setFilterMode("mine")} style={{ opacity: filterMode === "mine" ? 1 : 0.5 }}>My Sigils</button>
            <Link className="btn" to={'/make-sigil'}>Create Sigil</Link>
          </div>
          <div style={{
            width: '88dvw',
            height: '60dvh',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              border: '2px solid var(--theme-btn)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
              <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
              >
                <Marker
                  longitude={-90.08537}
                  latitude={29.92879}
                  anchor="bottom"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setCharacterPopup({ label: "Harper's Home Location", longitude: -90.08537, latitude: 29.92879 });
                  }}
                >
                  <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>🏡</div>
                </Marker>

                <Marker
                  longitude={-90.0639}
                  latitude={29.9574}
                  anchor="bottom"
                  onClick={e => {
                    e.originalEvent.stopPropagation();
                    setCharacterPopup({ label: "Bennet's Home Location", longitude: -90.0639, latitude: 29.9574 });
                  }}
                >
                  <div style={{ fontSize: '1.5rem', cursor: 'pointer' }}>⛪︎</div>
                </Marker>
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
                              className={sigil.isCharged ? 'sigil-charging' : ''}
                              style={{
                                width: '2rem',
                                height: '2rem',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '2px solid var(--theme-btn)',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                filter: 'drop-shadow(0 0 6px var(--theme-glow))',
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '1.5rem',
                              height: '1.5rem',
                              backgroundColor: 'var(--theme-btn)',
                              borderRadius: '50%',
                              border: '2px solid white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--theme-btn-text)',
                              fontSize: '0.75rem',
                              filter: 'drop-shadow(0 0 6px var(--theme-glow))',
                            }}
                              className={sigil.isCharged ? 'sigil-charging' : ''}
                            >✧</div>
                          )}
                        </div>
                      </Marker>
                    );
                  }
                  return null;
                })}
                {characterPopup && (
                  <Popup
                    anchor="top"
                    longitude={characterPopup.longitude}
                    latitude={characterPopup.latitude}
                    onClose={() => setCharacterPopup(null)}
                    maxWidth="500px"
                  >
                    <div style={{
                      padding: '10px 14px',
                      fontFamily: 'Pompiere, sans-serif',
                      fontSize: '14px',
                      color: 'var(--theme-text)',
                      textAlign: 'center',
                    }}>
                      {characterPopup.label}
                    </div>
                  </Popup>
                )}
                {popupInfo && (
                  <Popup
                    anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}
                    maxWidth="500px"
                    style={{ borderRadius: "16px" }}
                  >
                    <div style={{
                      width: '280px',
                      padding: '16px',
                      background: 'linear-gradient(135deg, var(--theme-bg-1), var(--theme-bg-2))',
                      borderRadius: '12px',
                      border: '1px solid var(--theme-btn)',
                      color: 'var(--theme-text)',
                      fontFamily: 'Special Elite, system-ui',
                    }}>
                      <h3 style={{
                        margin: '0 0 2px',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        fontFamily: 'New Rocker, system-ui',
                        color: 'var(--theme-text)',
                        textAlign: 'center',
                      }}>
                        {popupInfo.name}
                      </h3>

                      {popupInfo.locationName && (
                        <p style={{
                          margin: '0 0 10px',
                          fontSize: 'clamp(11px, 1.5vw, 13px)',
                          color: 'var(--theme-text)',
                          textAlign: 'center',
                          opacity: 0.7,
                        }}>
                          📍 {popupInfo.locationName}
                        </p>
                      )}

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
                              border: '2px solid var(--theme-btn)',
                              filter: 'drop-shadow(0 0 8px var(--theme-glow))',
                            }}
                          />
                        </div>
                      )}

                      <p style={{
                        margin: '0 0 8px',
                        fontSize: 'clamp(12px, 1.8vw, 14px)',
                        fontStyle: 'italic',
                        color: 'var(--theme-text)',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        fontFamily: 'Pompiere, sans-serif',
                        opacity: 0.9,
                      }}>
                        "{popupInfo.intention || 'A mysterious sigil...'}"
                      </p>

                      {popupInfo.creatorUsername && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginBottom: '14px',
                        }}>
                          <p style={{
                            margin: 0,
                            fontSize: 'clamp(11px, 1.5vw, 14px)',
                            color: 'var(--theme-btn)',
                            fontFamily: 'Pompiere, sans-serif',
                          }}>
                            ✦ by {popupInfo.creatorUsername}
                          </p>
                          {allowPublicFollows &&
                            popupInfo.creatorId &&
                            popupInfo.creatorId !== user.id &&
                            !followingIds.has(popupInfo.creatorId) && (
                              <button
                                onClick={() => handleFollow(popupInfo.creatorId!)}
                                disabled={following}
                                style={{
                                  padding: '2px 10px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--theme-btn)',
                                  background: 'transparent',
                                  color: 'var(--theme-btn)',
                                  fontFamily: 'Special Elite, system-ui',
                                  fontSize: 'clamp(12px, 1.6vw, 16px)',
                                  cursor: following ? 'not-allowed' : 'pointer',
                                  opacity: following ? 0.6 : 1,
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                + Follow Agent
                              </button>
                            )}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <button
                          onClick={() => handleVote("charge")}
                          disabled={voting}
                          style={{
                            flex: 1,
                            padding: '8px 0',
                            borderRadius: '8px',
                            border: popupInfo.userVote === "charge"
                              ? '2px solid var(--theme-btn)'
                              : '2px solid var(--theme-glow)',
                            background: popupInfo.userVote === "charge"
                              ? 'var(--theme-btn)'
                              : 'transparent',
                            color: popupInfo.userVote === "charge" ? 'var(--theme-btn-text)' : 'var(--theme-text)',
                            fontFamily: 'Special Elite, system-ui',
                            fontWeight: 600,
                            fontSize: 'clamp(12px, 1.8vw, 14px)',
                            cursor: voting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                            opacity: voting ? 0.6 : 1,
                          }}
                        >
                          ✨ Build Sigil {popupInfo.chargeScore}
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
                              : '2px solid rgba(239, 68, 68, 0.4)',
                            background: popupInfo.userVote === "destroy"
                              ? '#ef4444'
                              : 'transparent',
                            color: popupInfo.userVote === "destroy" ? 'white' : '#ef4444',
                            fontFamily: 'Special Elite, system-ui',
                            fontWeight: 600,
                            fontSize: 'clamp(12px, 1.8vw, 14px)',
                            cursor: voting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                            opacity: voting ? 0.6 : 1,
                          }}
                        >
                          🔥 Attack Sigil {popupInfo.destroyScore}
                        </button>
                      </div>

                      <button
                        style={{
                          width: '100%',
                          padding: '9px 0',
                          borderRadius: '8px',
                          background: 'var(--theme-btn)',
                          color: 'var(--theme-btn-text)',
                          fontFamily: 'Special Elite, system-ui',
                          fontWeight: 700,
                          fontSize: 'clamp(12px, 1.8vw, 14px)',
                          border: 'none',
                          cursor: 'pointer',
                          letterSpacing: '0.02em',
                          transition: 'filter 0.2s ease',
                        }}
                        onClick={() => navigate('/place-sigil-world', { state: { sigilData: popupInfo } })}
                      >
                        View in Real World →
                      </button>
                    </div>
                  </Popup>
                )}

                <NavigationControl position="bottom-right" />
              </Map>
            </div>

            <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', alignItems: 'center', zIndex: 10 }}>
              <MapSearchBox
                accessToken={MAPBOX_TOKEN}
                onRetrieve={(res) => {
                  if (res.features && res.features.length > 0) {
                    const [lng, lat] = res.features[0].geometry.coordinates;
                    setViewState({ ...viewState, longitude: lng, latitude: lat, zoom: 14 });
                  }
                }}
              />

            </div>
          </div>

          <UserFeed />
        </div>
      </div>
    </div>

  );
}