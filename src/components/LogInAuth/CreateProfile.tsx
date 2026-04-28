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
  const [homeLocation, setHomeLocation] = useState('');
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
          homeLocation
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
      <div className="landingpage">
        <div className="flex flex-col justify-evenly h-[90vh] bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[80vw] m-6 pointer-events-auto border border-white/20 transform transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-8">
          <h1 style={{ color: "black", fontSize: "38px" }}>Create Your Profile:</h1>
          <label className="h2">Choose a unique SigiLife Username:
            <br />
            <input style={{color:"black"}}className="textinput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className='avatarchoicebox'><h3>Choose a SigiLord:</h3>
            <div className='avatarimgbox'>
              <img className='avatar' src='Avatar1.png' alt='trench-coat-detective' onClick={() => setAvatar('0')}
                style={{ outline: avatar === '0' ? '2px solid #2b0681' : 'none', cursor: 'pointer', height: 100, borderRadius: "20px" }} />
              <img className='avatar' src='Avatar2.png' alt='dress-detective' onClick={() => setAvatar('1')}
                style={{ outline: avatar === '1' ? '2px solid #136d2a' : 'none', cursor: 'pointer', height: 100, borderRadius: "20px" }} />
            </div>
          </label>

          <label>Choose your Home Sigil Location:
            <MapSearchBox
              accessToken={import.meta.env.VITE_MAPBOX_TOKEN || ''}
              onRetrieve={(res) => {
                if (res.features && res.features.length > 0) {
                  setHomeLocation(res.features[0].properties.full_address || res.features[0].properties.name);
                }
              }}
            />
          </label>

          <label>
            Dark or Light Theme:<br />
            <SwitchPrimitive.Root checked={isDark} onCheckedChange={handleThemeChange}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-300 data-[state=checked]:bg-purple-500">

              <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
            </SwitchPrimitive.Root>
            {isDark ? "  Dark" : "  Light"}
            <br />
            {isDark ? " You prefer the shadows, stealth attacks, sewing secrets, deep corners, and the night... (or you are playing the game at night.)" : " You prefer the daylight, sparkly, splashy attacks, shimmering light, and bright sun... (or you are playing the game in daylight.)"}
          </label>
<br />
          <button
            className="btn"
            disabled={!username || !homeLocation}
            onClick={handleCreate}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
