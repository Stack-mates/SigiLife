
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
  const { user } = useUser()
  useEffect(() => {
    if (!sigilId) { return }
    fetch(`/api/sigils/${sigilId}`)
      .then(res => res.json())
      .then(data => setSigilData(data))
      .catch(err => console.error(err))
  }, [sigilId])

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
      <div className="sigilpage">
        <Menu />

        <div className="sigildetails">
          <p>{sigilData.name}</p>
          <p>Created: {new Date(sigilData.createdAt).toLocaleDateString()}</p>
          {sigilData.locationName ? (
            <p>at: {sigilData.locationName}</p>
          ) : (
            <div className="sigilpageaddlocation">
              <p>Set a location for this sigil:</p>
              {isSavingLocation ? (
                <p>Saving...</p>
              ) : (
                <MapSearchBox
                  accessToken={MAPBOX_TOKEN}
                  onRetrieve={handleLocationRetrieve}
                />
              )}
            </div>
          )}
          <p>{sigilData.isCharged ? "Charged" : ""}</p>
        </div>

        {sigilData.imageData && (
          <img className="glasscard" src={sigilData.imageData} alt={sigilData.name} />
        )}

        <div className="sigilbuttonstack">
          {!sigilData.isCharged && (
            <Link className="btn" to={`/charge-sigil?sigilId=${sigilData.id}`}>Charge Sigil</Link>
          )}
          <Link className="btn" to={`/destroy-sigil?sigilId=${sigilData.id}`}>Destroy Sigil</Link>
          {user?.isAdmin && (
            <Link className="btn" to="/place-sigil-world" state={{ sigilData }}>View in AR</Link>
          )}
        </div>

      </div>
    </div>
  )
}