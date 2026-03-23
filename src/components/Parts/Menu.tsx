import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
      <Link to="/profile">Back to Sigil Room</Link>
      <br />
            <Link to="/map">SigilMap</Link>
                  <br />
            <Link to="/settings">Back to Sigil Room</Link>
  </div>
  )
}