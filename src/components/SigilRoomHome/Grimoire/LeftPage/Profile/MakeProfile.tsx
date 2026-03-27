import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useFormStatus } from "react-dom";




export default function MakeProfile() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("0");
  const [theme, setTheme] = useState("0");
  const [homeLatitude, setHomeLatitude] = useState(0.0);
  const [homeLongitude, setHomeLongitude] = useState(0.0);
  const [homeLocation, setHomeLocation] = useState('')
  //const { pending, data, method, action } = useFormStatus();

  const handleHomeLocation = ({ latitude, longitude }: { latitude: any, longitude: any }) => {
    console.log('this will set your', homeLatitude, homeLongitude, homeLocation)
    setHomeLatitude(latitude);
    setHomeLongitude(longitude)
    setHomeLocation('set location!')
  }

function Submit() {
  const status = useFormStatus();
  const newProfile = {
    username: username,
    avatar: avatar,
    theme: theme,
    homeLatitude: homeLatitude,
    homeLongitude: homeLongitude,
    homeLocation: homeLocation,
  }
  console.log(newProfile)
  return <button disabled={status.pending}>Submit</button>
}

  return (
    <div className='main-container'>
      <div className='makeprofile'>
        <h1>Create Profile</h1>

        This is where you will link your Google Account

        <form>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            choose your Username
          </label>

          <label>
            <input
              type="number"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            choose your avatar
          </label>

          <label>
            <input
              type="text"
              value={homeLatitude}
              onChange={() => handleHomeLocation}
            />
            choose your home location?</label>

          <label>
            <input
              type="number"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
            choose your theme?
          </label>
          <br/>
          <Submit />
        </form>

        This is where you will confirm your choices / Choices are validated


        <br />
        <Link to="/home">Enter SigiLife</Link>
      </div ></div>
  )
}
