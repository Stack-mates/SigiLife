import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

const NavMenu = function () {
  const navigate = useNavigate()
  return (
    <nav className='menu glasscard'>

      <button onClick={() => navigate(-1)}>⬅ Go Back</button>
      <Link  to="/home">Home Room</Link>
      <Link  to="/library?action=charge">Charge Sigil</Link>
      <Link  to="/library?action=destroy">Destroy Sigil</Link>
      <Link  to="/make-sigil">Make Sigil</Link>
      <Link  to="/library">Sigil Library</Link>
      <Link  to="/map">SigilMap</Link>
      <Link  to="/profile">SigiLites</Link>
      <Link  to="/settings">Settings</Link>


    </nav>
  )
}


export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) { return null }

  return (
    <div className="navmenu">
     <button id="menu-btn"  onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? '✕ Close' : '☰'}
      </button>
      {menuOpen && <NavMenu />}
    </div>
  )
}