
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import MapSearchBox from '../../Grimoire/LeftPage/Map/MapSearchBox';
import Menu from '../../../Parts/Menu'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';


export default function StyleSigil() {
  const { user } = useUser()

  const navigate = useNavigate();
  const [sigilData, setSigilData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<{
    locationName: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleLocationRetrieve = (res: any) => {
    if (res.features && res.features.length > 0) {
      const feature = res.features[0];
      const [lng, lat] = feature.geometry.coordinates;
      const locationName =
        feature.properties.name ||
        feature.properties.full_address ||
        'Unknown Location';
      setLocation({ locationName, latitude: lat, longitude: lng });
    }
  };

  const scrollCallbackRef = (el: HTMLDivElement | null) => {
    if (el) {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      scrollRef.current = el;
    }
  };



  useEffect(() => {
    // Load data from localStorage
    const name = localStorage.getItem('sigilName') || 'My New Sigil';
    const intention = localStorage.getItem('sigilIntention') || '';
    const canvasData = localStorage.getItem('sigilCanvasData') || '';
    const imageData = localStorage.getItem('sigilImageData') || '';

    setSigilData({ name, intention, canvasData, imageData });
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/users/${user.id}/following`)
        .then(res => res.json())
        .then(data => setFriends(data))
        .catch(err => console.error("Error fetching friends:", err));
    }
  }, [user]);

  const toggleFriend = (id: number) => {
    setSelectedFriends(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };


  const handleSave = async () => {
    if (!user || !user.id) {
      setError("You must be logged in to save a sigil.");
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/sigils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sigilData.name,
          userId: user.id,
          intention: sigilData.intention,
          canvasData: sigilData.canvasData,
          imageData: sigilData.imageData,
          ...(location ?? {}),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save sigil');
      }

      const result = await response.json();
      console.log(result)

      if (selectedFriends.length > 0) {
        await fetch('/api/sigils/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sigilId: result.id,
            targetUserIds: selectedFriends
          })
        });
      }

      // Clear localStorage
      localStorage.removeItem('sigilName');
      localStorage.removeItem('sigilIntention');
      localStorage.removeItem('sigilUniqueChars');
      localStorage.removeItem('sigilCanvasData');
      localStorage.removeItem('sigilImageData');

      // Navigate to library to see the newly saved sigil
      navigate('/library');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!sigilData) return <div>Loading...</div>;



return (
  <div className='maincontainer'>
    <div className="scrollcontainer" ref={scrollCallbackRef}>
      <div className='stylesigilcontainer'>
        <Menu/>
        <div className="flex flex-col bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/20 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-8"
          style={{
            width: "88dvw",
            maxWidth: "700px",
            height: "88dvh",
            overflowY: "auto",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
          }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", textAlign: "center" }}>
            Share & Save your Sigil
          </h1>
            {/* Sigil preview */}
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)" }}>{sigilData.name}</h2>
              {sigilData.intention && (
                <p style={{ fontSize: "clamp(13px, 2vw, 16px)", color: "#666", margin: "4px 0 8px" }}>
                 {sigilData.intention}
                </p>
              )}
              {sigilData.imageData && (
                <img
                  src={sigilData.imageData}
                  alt={sigilData.name}
                  style={{
                    width: 'min(100%, 50vh)',
                    height: 'min(100%, 50vh)',
                    aspectRatio: '1 / 1',     /* ← square, no stretch */
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block',
                  }}
                />
              )}
            </div>

            {/* Location — compact */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
              <h2 style={{ fontSize: "clamp(16px, 2.5vw, 22px)", marginBottom: "0.5rem" }}>📍 Location</h2>
              {location ? (
                <p style={{ fontSize: "clamp(13px, 2vw, 16px)", display: "flex", alignItems: "center", gap: "8px", }}>
                  {location.locationName}
                  <button onClick={() => setLocation(null)}
                    style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}>
                    ✕
                  </button>
                </p>
              ) : (
                <div style={{ maxWidth: "50dvw", margin: "0 auto", width: "100%" }}>
                  <MapSearchBox accessToken={MAPBOX_TOKEN} onRetrieve={handleLocationRetrieve} />
                </div>
              )}
            </div>

            {/* Friends */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
              <h2 style={{ fontSize: "clamp(16px, 2.5vw, 22px)", marginBottom: "0.25rem" }}>Share with SigiFriends</h2>
              <p style={{ fontSize: "clamp(12px, 1.8vw, 15px)", color: "#888", marginBottom: "0.5rem" }}>
                Select users to share your sigil to, if they have a slot available.
              </p>
              <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                {friends.length === 0 ? (
                  <p style={{ fontSize: "clamp(13px, 2vw, 16px)" }}>You are not following anyone yet.</p>
                ) : (
                  friends.map(friend => (
                    <div key={friend.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                      <input type="checkbox" id={`friend-${friend.id}`}
                        checked={selectedFriends.includes(friend.id)}
                        onChange={() => toggleFriend(friend.id)}
                        style={{ cursor: 'pointer' }} />
                      <label htmlFor={`friend-${friend.id}`} style={{ cursor: 'pointer', fontSize: "clamp(13px, 2vw, 16px)" }}>
                        {friend.username}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>

            {error && <p style={{ color: 'red', fontSize: "14px" }}>{error}</p>}
            <button className="btn" onClick={handleSave} disabled={isSaving}
              style={{ backgroundColor: '#9e38fd', fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px", alignSelf: "center" }}>
              {isSaving ? "Saving..." : "Save to Library"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
