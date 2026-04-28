
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import MapSearchBox from '../../Grimoire/LeftPage/Map/MapSearchBox';

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
          <h1>Share & Save your Sigil</h1>

          <div className="glasscard" style={{ minHeight: "75dvh", display: "flex", flex: 1 }}>
            <h1>Name:<br /> {sigilData.name}</h1>
            {sigilData.intention && <p>Intention: {sigilData.intention}</p>}
            {sigilData.imageData && (
              <img src={sigilData.imageData} alt={sigilData.name} style={{width: '100%', height: '100%' }} />
            )}
          </div>
          <div className="glasscard" style={{ padding: '5px', minHeight: "23dvh", position: 'relative', zIndex: 20 , flex: 0, display: "flex", justifyContent: "start"}}>
            <h2>Location</h2>
            {location ? (
              <p>
                📍 {location.locationName}{' '}
                <button
                  onClick={() => setLocation(null)}
                  style={{ marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}
                >
                  ✕ Remove
                </button>
              </p>
            ) : (
              <MapSearchBox
                accessToken={MAPBOX_TOKEN}
                onRetrieve={handleLocationRetrieve}
              />
            )}
          </div>
          <div className="glasscard" style={{ minHeight: "23dvh" }}>
            <h2>Share with your SigiFriends</h2>
            <h3>Select users to share your sigil to, if they have a slot available.</h3>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {friends.length === 0 ? (
                <p>You are not following anyone yet.</p>
              ) : (
                friends.map(friend => (
                  <div key={friend.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}>
                    <input
                      type="checkbox"
                      id={`friend-${friend.id}`}
                      checked={selectedFriends.includes(friend.id)}
                      onChange={() => toggleFriend(friend.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <label htmlFor={`friend-${friend.id}`} style={{ cursor: 'pointer' }}>
                      {friend.username}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save to Library"}
          </button>
        </div>
      </div>
    </div>
  )
}
