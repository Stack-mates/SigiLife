import { Routes, Route } from 'react-router-dom'
import { useState} from 'react'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Landing Page & Log in
import LandingPage from './components/LogInAuth/LandingPage'
import Login from './components/LogInAuth/LogIn'
import MakeProfile from './components/SigilRoomHome/Grimiore/Profile/MakeProfile'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User
import UserProfile from './components/SigilRoomHome/Grimiore/Profile/UserProfile'
import UserSettings from './components/SigilRoomHome/Grimiore/Profile/UserSettings'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HomeRoom & Components
import HomeRoom from './components/SigilRoomHome/HomeRoom'
import SigilDestroy from './components/SigilRoomHome/DestroySigil/SigilDestroy'
import SigilCharge from './components/SigilRoomHome/ChargeSigil/SigilCharge'
import Grimoire from './components/SigilRoomHome/Grimiore/Grimoire'
import MakeSigil from './components/SigilRoomHome/MakeSigil/MakeSigil'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Make Sigil
import DrawSigil from './components/SigilRoomHome/MakeSigil/MakeSigilComponents/DrawSigil'
import WriteSigil from './components/SigilRoomHome/MakeSigil/MakeSigilComponents/WriteSigil'
import StyleSigil from './components/SigilRoomHome/MakeSigil/MakeSigilComponents/StyleSigil'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Grimoire
import MapBox from './components/SigilRoomHome/Grimiore/Map/MapBox'
import SigiLibrary from './components/SigilRoomHome/Grimiore/SigiLibrary/SigiLibrary'
import SigilPage from './components/SigilRoomHome/Grimiore/SigiLibrary/SigilPage'
import ScryeFriends from './components/SigilRoomHome/Grimiore/ScryeFriends/ScryeFriendsHome'

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Properties
const BASE_URL = 'http://localhost:3000'

const ApiCall = async (typeCall = 'GET', endpoint = '/', request = null) => {
  try{
    const options: RequestInit = {
      method: typeCall,
      headers: {
        "Content-Type": "application/json"
      },
    };
    if (request){
      options.body = JSON.stringify(request)
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok){
      throw new Error(`🚨 SigiLife apiCall error status 📢:${response.status}`)
    }
    return await response.json();
  }
  catch (error){
    console.error(`🚨 SigiLife apiCall fail reason 📢:${error}❗👀`);
    throw error;
  }
};


function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Auth flow */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login ApiCall={ApiCall} setUser={setUser}/>} />
      <Route path="/make-profile" element={<MakeProfile />} />

      {/* User */}
      <Route path="/settings" element={<UserSettings />} />
      <Route path="/profile" element={<UserProfile user={user}/>} />

      {/* Main Room Nav */}
      <Route path="/destroy-sigil" element={<SigilDestroy />} />
      <Route path="/home" element={<HomeRoom />} />
      <Route path="/charge-sigil" element={<SigilCharge />} />
      <Route path="/grimoire" element={<Grimoire/>} />
      <Route path="/make-sigil" element={<MakeSigil />} />


      {/* Make Sigil flow */}
      <Route path="/make-sigil/draw" element={<DrawSigil />} />
      <Route path="/make-sigil/write" element={<WriteSigil />} />
      <Route path="/make-sigil/style" element={<StyleSigil />} />

      {/* Grimoire flow */}

      <Route path="/map" element={<MapBox />} />
      <Route path="/scrye-friends" element={<ScryeFriends />} />
      <Route path="/library" element={<SigiLibrary />} />
      <Route path="/sigil-page" element={<SigilPage />} />

    </Routes>
  )
}

export default App
