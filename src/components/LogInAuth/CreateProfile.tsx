import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useUser } from '@/context/UserContext';
import MapSearchBox from '@/components/SigilRoomHome/Grimoire/LeftPage/Map/MapSearchBox';


export default function CreateProfile() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('0');
  const [homeLocation, setHomeLocation] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isDark, setIsDark] = useState(false);

  const handleCreate = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          avatar: parseInt(avatar),
          theme: isDark ? 1 : 0,
          lightOrDark: isDark ? 1 : 0,
          homeTeam: parseInt(avatar),
          homeLocation: homeLocation ? JSON.stringify(homeLocation) : null
        })
      });
      const updated = await res.json();
      setUser(updated);
      navigate('/make-sigil/write');
    } catch (err) {
      console.error(err);
    }
  };

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked);
    document.documentElement.classList.toggle("dark", checked);
  };

  return (
    <div className='maincontainer'>

      <div className='scrollcontainer'>
        <div className="landingpage">
          <div className="glasscard" style={{
            width: "min(70dvh, 88dvw)"
          }}>
            <h1 style={{ color: "black" }}>Welcome, Agent!</h1>
            <p style={{ textAlign: "center", width: "100%" }}>
              Choose your unique SigiLife Agent Name:
              <input
                style={{ color: "black" }}
                className="textinput"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </p>

            <label className='avatarchoicebox'><h2 style={{ color: "black" }}>Choose a Costume:</h2>
              <div className='avatarimgbox'>
                <img className='avatar' src='Avatar1.png' alt='trench-coat-detective' onClick={() => setAvatar('0')}
                  style={{ outline: avatar === '0' ? '4px solid #2b0681' : 'none', cursor: 'pointer', height: 250, borderRadius: "20px" }} />
                <img className='avatar' src='Avatar2.png' alt='dress-detective' onClick={() => setAvatar('1')}
                  style={{ outline: avatar === '1' ? '4px solid #136d2a' : 'none', cursor: 'pointer', height: 250, borderRadius: "20px" }} />
              </div>
            </label>

            <label style={{width: '100%', maxWidth: '30%', alignSelf: 'center'}}>Choose your Home Sigil Location:
              <MapSearchBox
                accessToken={import.meta.env.VITE_MAPBOX_TOKEN || ''}
                onRetrieve={(res) => {
                  if (res.features && res.features.length > 0) {
                    const feature = res.features[0];
                    const [lng, lat] = feature.geometry.coordinates;
                    const name = feature.properties.full_address
                      || feature.properties.place_formatted
                      || feature.properties.name
                      || '';
                    setHomeLocation({ name, latitude: lat, longitude: lng });
                  }
                }} 

              />
            </label>

            <label>
              <h2 style={{ color: "black" }} >Dark or Light Theme:</h2>
              <SwitchPrimitive.Root checked={isDark} onCheckedChange={handleThemeChange}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-300 data-[state=checked]:bg-purple-500">

                <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
              </SwitchPrimitive.Root>
              <label className='p1'>
                {isDark ? "  Dark" : "  Light"}
                <br />
                {isDark ? " You prefer the shadows, stealth attacks, sewing secrets, deep corners, and the night... (or you are playing the game at night.)" : " You prefer the daylight, sparkly, splashy attacks, shimmering light, and bright sun... (or you are playing the game in daylight.)"}
              </label></label>
            <br />
            <button
              className="pinkbutton"
              disabled={!username || !homeLocation}
              onClick={handleCreate}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
