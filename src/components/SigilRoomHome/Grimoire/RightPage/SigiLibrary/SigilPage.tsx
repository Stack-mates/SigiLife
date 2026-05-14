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
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);


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

  const handleSaveName = async () => {
    if (!editedName.trim() || !sigilData) return;
    setIsSavingName(true);
    try {
      const res = await fetch(`/api/sigils/${sigilData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName.trim() }),
      });
      if (!res.ok) throw new Error('Failed to save name');
      const updated = await res.json();
      setSigilData((prev: any) => ({ ...prev, name: updated.name }));
      setIsEditingName(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingName(false);
    }
  };

  if (!sigilData) return <p>Loading sigil...</p>;

  return (
    <div className="maincontainer">
      <div ref={scrollRef} className="scrollcontainer">
        <div className="sigilpage art-page-base" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />

          <div className="glasscard"
            style={{
              position: 'relative',
              top: '5dvh',
              left: '58dvh',
              width: '50dvh',
              height: '88dvh',
              gap: '0.75rem',
              display: 'flex',
              opacity: '.20',
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
                  width: 'min(100%, 50dvh)',
                  aspectRatio: '1 / 1',
                  objectFit: 'contain',
                  borderRadius: '1rem',
                }}
              />
            )}

            {isEditingName ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                <textarea
                  className="glass-input"
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    resize: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '0.75rem',
                    color: 'inherit',
                    fontFamily: 'New Rocker, system-ui',
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    padding: '0.5rem',
                    outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={handleSaveName}
                    disabled={isSavingName || !editedName.trim()}
                    className="btn"
                  >
                    {isSavingName ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="btn"
                    style={{ opacity: 0.6 }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <h2 style={{ margin: 0 }}>{sigilData.name}</h2>
                <button
                  onClick={() => { setEditedName(sigilData.name); setIsEditingName(true); }}
                  className="btn"
                  style={{ fontSize: '0.75rem', opacity: 0.7 }}
                >
                  Change Name
                </button>
              </div>
            )}
            <p style={{ fontSize: "clamp(16px, 2.5dvh, 24px)", opacity: 0.7 }}>
              Created: {new Date(sigilData.createdAt).toLocaleDateString()}
            </p>
            {sigilData.isCharged && (
              <p style={{ color: "gold", fontSize: "clamp(16px, 2.5dvh, 24px)" }}>⚡ Charged</p>
            )}

            {sigilData.sigilGroups && sigilData.sigilGroups.length > 0 && (
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '0.5rem',
                width: '100%',
                textAlign: 'center',
              }}>
                <h3 style={{ fontSize: "clamp(16px, 2.5dvh, 24px)", marginBottom: '0.5rem' }}>SigiLites</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                  {sigilData.sigilGroups.map((g: any) => (
                    <span
                      key={g.id}
                      style={{
                        background: 'rgba(168, 85, 247, 0.2)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        borderRadius: '999px',
                        padding: '2px 12px',
                        fontSize: 'clamp(13px, 2dvh, 18px)',
                        color: '#c4b5fd',
                      }}
                    >
                      {g.groupMember}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.5rem', width: '100%', textAlign: 'center' }}>
              {sigilData.locationName ? (<div>
                <p style={{ fontSize: "clamp(16px, 2.5dvh, 24px)" }}>🗺️{sigilData.locationName}</p>
                <Link className="pinkbutton " style={{ border: '0px', width: '100%', textAlign: 'left', fontFamily: 'Pompiere', borderRadius: '12px'}} to="/map">SigilMap</Link></div>
              ) : (
                <div>
                  <p style={{ fontSize: "clamp(16px, 2.5dvh, 24px)", marginBottom: "0.5rem" }}>Set a location:</p>
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
              <p style={{ fontSize: "clamp(16px, 2.5dvh, 24px)", opacity: 0.6, textAlign: 'center', marginBottom: '0.5rem' }}>
                Community Energy
              </p>
              <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
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
                    color: sigilData.userVote === "charge" ? 'black' : '#c4b5fd',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2dvh, 34px)',
                    cursor: voting ? 'not-allowed' : 'pointer',
                    opacity: voting ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  ✨ Votes to Charge&nbsp; {sigilData.chargeScore ?? 0}
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
                    color: sigilData.userVote === "destroy" ? 'black' : '#f87171',
                    fontWeight: 600,
                    fontSize: 'clamp(18px, 2dvh, 34px)',
                    cursor: voting ? 'not-allowed' : 'pointer',
                    opacity: voting ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  🔥 Votes to Destroy&nbsp; {sigilData.destroyScore ?? 0}
                </button>
              </div>
            </div>

            <div style={{ width: '100%' }}>
              {!sigilData.isCharged && (
                <Link className="btn" to={`/charge-sigil?sigilId=${sigilData.id}`}
                  style={{ fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                  ⚡ Charge Sigil
                </Link>
              )}
              <Link className="btn" to={`/destroy-sigil?sigilId=${sigilData.id}`}
                style={{ fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                💀 Destroy Sigil
              </Link>
              <Link className="btn" to={`/library`}
                style={{ fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                📚 To the Library
              </Link>
              {user?.isAdmin && (
                <Link className="btn" to="/place-sigil-world" state={{ sigilData }}
                  style={{ fontSize: "clamp(12px, 1.8dvh, 18px)", padding: "8px 20px", textAlign: 'center' }}>
                  🌍 Place in World
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}