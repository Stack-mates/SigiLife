import BackButton from "../../Parts/BackButton"

import { Link } from 'react-router-dom'


export default function Grimoire() {
  return (
    <div>
      <h1>Grimoire</h1>

      <div>
        <br />
        <Link to="/map">Map</Link>
        <br />
        <Link to="/scrye-friends">Scrye</Link>
        <br />
        <Link to="/profile" >Profile</Link>
        <br />
      </div>

      <div>
        <Link to="/library">SigiLibrary</Link>
      </div>
      <br />
      <br />
      <br />

      <BackButton />
    </div>
  )
}
