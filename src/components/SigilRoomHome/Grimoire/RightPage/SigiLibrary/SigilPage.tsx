
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import MapSearchBox from '../../LeftPage/Map/MapSearchBox'
import Menu from '../../../../Parts/Menu'
import { useUser } from '@/context/UserContext'


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

export default function SigilPage() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const [sigilData, setSigilData] = useState<any>(null);
  const [isSavingLocation, setIsSavingLocation] = useState(false);
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
  if (!sigilId) { return }
  fetch(`/api/sigils/${sigilId}`)
    .then(res => res.json())
    .then(data => setSigilData(data))
    .catch(err => console.error(err))
}, [sigilId])

useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;
  setTimeout(() => {
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, 100);
}, [dims, sigilData]);

  if (!sigilData) { return <p>Loading sigil...</p> }

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
        setSigilData(response.data);
      } catch (error) {
        console.error("Failed to save location:", error);
        alert("Failed to save location");
      } finally {
        setIsSavingLocation(false);
      }
    }
  };

 return (
    <div className="maincontainer">
      <div ref={scrollRef} className="scrollcontainer">
        <div className="sigilpage" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
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
  )
}