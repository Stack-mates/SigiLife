import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/context/UserContext'

function NavMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()

  return (
    <div
      className="glasscard"
      style={{
        width: 'fit-content',
        minWidth: '160px',
        padding: '1rem',
        gap: '0.4rem',
        margin: 0,
        alignSelf: 'flex-start',
        position: 'relative',
        left: 0,
        top: 0,
      }}
    >
      <button
        className="pinkbutton"
        style={{ border: '0px',  width: '100%', textAlign: 'left', fontFamily: 'Pompiere', borderRadius: '0' }}
        onClick={onClose}
      >
        ✕ Close
      </button>
      <button
        className="pinkbutton"
        style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }}
        onClick={() => { navigate(-1); onClose() }}
      >
        ← Go Back
      </button>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left', fontFamily: 'Pompiere', borderRadius: '0'}} to="/home" onClick={onClose}>The Office</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/make-sigil" onClick={onClose}>Write Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/library?action=charge" onClick={onClose}>Charge Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',   width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/library?action=destroy" onClick={onClose}>Destroy Sigil</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/grimoire" onClick={onClose}>Bookshelf</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/map" onClick={onClose}>SigilMap</Link>
      <Link className="pinkbutton " style={{ border: '0px',  width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/profile" onClick={onClose}>SigilLites</Link>
      <Link className="pinkbutton " style={{ border: '0px',   width: '100%', textAlign: 'left',fontFamily: 'Pompiere', borderRadius: '0' }} to="/settings" onClick={onClose}>Settings</Link>
    </div>
  )
}

export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) return null

  const AvatarFace = () => (
    <div className="avatarfacebox">
      <img className="avatarface" src={`/Avatar${user.avatar + 1}face.png`} style={{ height: '40px' }} />
    </div>
  )

  return (
    <div
      className="navmenu"
      id='menu-btn'
      style={{
        position: 'fixed',
        top: '5px',
        left: '5px',
        zIndex: 10000,
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        pointerEvents: 'auto',
      }}
    >
      {!menuOpen && (
        <button
          className="glassbutton"
          style={{ padding: '0.4rem 0.75rem' }}
          onClick={() => setMenuOpen(true)}
        >
          ☰ 
          <AvatarFace/>
        </button>
      )}
      {menuOpen && <NavMenu onClose={() => setMenuOpen(false)} />}
    </div>
  )
}