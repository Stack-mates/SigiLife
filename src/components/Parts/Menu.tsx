import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
      <Link className="navbutton" to="/make-sigil/write">Write It</Link>
      <br />
      <Link className="navbutton" to="/library">Sigil Library</Link>
      <br />
      <Link className="navbutton" to="/map">SigilMap</Link>
      <br />
      <Link className="navbutton" to="/settings">Settings</Link>
    </div>
  )
}