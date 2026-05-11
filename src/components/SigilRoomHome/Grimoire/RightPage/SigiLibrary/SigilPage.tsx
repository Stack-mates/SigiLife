import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MapSearchBox from '../../LeftPage/Map/MapSearchBox'
import Menu from '../../../../Parts/Menu'
import { useUser } from '@/context/UserContext'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

type VoteType = "charge" | "destroy";

export default function SigilPage() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const [sigilData, setSigilData] = useState<any>(null);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const [voting, setVoting] = useState(false);
  const [dims, setDims] = useState({ width: 2160, height: 1260 });
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260;
      setDims({
        width: Math.round(2160 * scale),
        height: window.innerHeight,
      });
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  useEffect(() => {
    if (!sigilId) return;
    // Fetch sigil + userVote in parallel
    Promise.all([
      fetch(`/api/sigils/${sigilId}`).then(r => r.json()),
      axios.get(`/api/sigils/${sigilId}/vote-status`).catch(() => ({ data: { userVote: null } }))
    ]).then(([sigil, voteRes]) => {
      setSigilData({ ...sigil, userVote: voteRes.data?.userVote ?? null });
    }).catch(err => console.error(err));
  }, [sigilId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, 100);
  }, [dims, sigilData]);

  const handleVote = async (voteType: VoteType) => {
    if (!sigilData || voting) return;
    setVoting(true);
    try {
      const res = await axios.post(`/api/sigils/${sigilData.id}/vote`, { voteType });
      const { chargeScore, destroyScore, userVote } = res.data;
      setSigilData((prev: any) => ({ ...prev, chargeScore, destroyScore, userVote }));
    } catch (err) {
      console.error("Vote failed:", err);
    } finally {
      setVoting(false);
    }
  };

  const handleLocationRetrieve = async (res: any) => {
    if (res.features && res.features.length > 0) {
      const feature = res.features[0];
      const [lng, lat] = feature.geometry.coordinates;
      const locationName = feature.properties.name || feature.properties.full_address || "Unknown Location";
      setIsSavingLocation(true);
      try {
        const response = await axios.patch(`/api/sigils/${sigilData.id}/location`, {
          locationName,
          latitude: lat,
          longitude: lng
        });
        setSigilData((prev: any) => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error("Failed to save location:", error);
        alert("Failed to save location");
      } finally {
        setIsSavingLocation(false);
      }
    }
  };

  if (!sigilData) return <p>Loading sigil...</p>;

  return (
    <div className="maincontainer">
      <div ref={scrollRef} className="scrollcontainer">
        <div className="sigilpage art-page-base" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />

          <div className="flex flex-col bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/20 transition-all duration-500"
            style={{
              position: 'absolute',
              top: '5dvh',
              left: '58dvh',
              width: '55dvh',
              height: '88dvh',
              gap: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: 'auto',
            }}>

            {sigilData.imageData && (
              <img
                src={sigilData.imageData}
                alt={sigilData.name}
                className={sigilData.isCharged ? 'sigil-charging' : ''}
                style={{
                  width: 'min(100%, 25dvh)',
                  aspectRatio: '1 / 1',
                  objectFit: 'contain',
                  borderRadius: '1rem',
                }}
              />
            )}

            <h1 style={{ fontSize: "clamp(16px, 3dvh, 28px)", textAlign: "center" }}>
              {sigilData.name}
            </h1>
            <p style={{ fontSize: "clamp(11px, 1.5dvh, 15px)", opacity: 0.7 }}>
              Created: {new Date(sigilData.createdAt).toLocaleDateString()}
            </p>
            {sigilData.isCharged && (
              <p style={{ color: "gold", fontSize: "clamp(12px, 1.8dvh, 16px)" }}>⚡ Charged</p>
            )}

            {sigilData.sigilGroups && sigilData.sigilGroups.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.5rem', width: '100%', textAlign: 'center' }}>
                <h3 style={{ fontSize: "clamp(12px, 1.8dvh, 16px)" }}>Group</h3>
                <p style={{ fontSize: "clamp(11px, 1.5dvh, 14px)", opacity: 0.8 }}>
                  {sigilData.sigilGroups.map((g: any) => g.groupMember?.join(', ')).join(' · ')}
                </p>
              </div>
            )}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.5rem', width: '100%', textAlign: 'center' }}>
              {sigilData.locationName ? (
                <p style={{ fontSize: "clamp(11px, 1.5dvh, 14px)" }}>📍 {sigilData.locationName}</p>
              ) : (
                <div>
                  <p style={{ fontSize: "clamp(11px, 1.5dvh, 14px)", marginBottom: "0.5rem" }}>Set a location:</p>
                  {isSavingLocation ? <p>Saving...</p> : (
                    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                      <MapSearchBox accessToken={MAPBOX_TOKEN} onRetrieve={handleLocationRetrieve} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Charge / Destroy Votes */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '0.75rem',
              width: '100%',
            }}>
              <p style={{ fontSize: "clamp(11px, 1.5dvh, 13px)", opacity: 0.6, textAlign: 'center', marginBottom: '0.5rem' }}>
                Community Energy
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                <button
                  onClick={() => handleVote("charge")}
                  disabled={voting}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '10px',
                    border: sigilData.userVote === "charge"
                      ? '2px solid #a855f7'
                      : '2px solid rgba(168, 85, 247, 0.3)',
                    background: sigilData.userVote === "charge"
                      ? 'rgba(168, 85, 247, 0.35)'
                      : 'rgba(168, 85, 247, 0.1)',
                    color: sigilData.userVote === "charge" ? '#e9d5ff' : '#c4b5fd',
                    fontWeight: 600,
                    fontSize: 'clamp(11px, 1.5dvh, 14px)',
                    cursor: voting ? 'not-allowed' : 'pointer',
                    opacity: voting ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  ✨ Charge&nbsp; {sigilData.chargeScore ?? 0}
                </button>

                <button
                  onClick={() => handleVote("destroy")}
                  disabled={voting}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '10px',
                    border: sigilData.userVote === "destroy"
                      ? '2px solid #ef4444'
                      : '2px solid rgba(239, 68, 68, 0.3)',
                    background: sigilData.userVote === "destroy"
                      ? 'rgba(239, 68, 68, 0.25)'
                      : 'rgba(239, 68, 68, 0.08)',
                    color: sigilData.userVote === "destroy" ? '#fca5a5' : '#f87171',
                    fontWeight: 600,
                    fontSize: 'clamp(11px, 1.5dvh, 14px)',
                    cursor: voting ? 'not-allowed' : 'pointer',
                    opacity: voting ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  🔥 Destroy&nbsp; {sigilData.destroyScore ?? 0}
                </button>
              </div>
            </div>

            <div className="sigilbuttonstack" style={{ width: '100%' }}>
              {!sigilData.isCharged && (
                <Link className="btn" to={`/charge-sigil?sigilId=${sigilData.id}`}
                  style={{ backgroundColor: '#9e38fd', fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                  ⚡ Charge Sigil
                </Link>
              )}
              <Link className="btn" to={`/destroy-sigil?sigilId=${sigilData.id}`}
                style={{ backgroundColor: '#9e38fd', fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                💀 Destroy Sigil
              </Link>
              {user?.isAdmin && (
                <Link className="btn" to="/place-sigil-world" state={{ sigilData }}
                  style={{ backgroundColor: '#9e38fd', fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                  🌍 View in AR
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}