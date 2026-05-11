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
        className="glassbutton"
        style={{ padding: '0.25rem 0.75rem', border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }}
        onClick={onClose}
      >
        ✕ Close
      </button>
      <button
        className="glassbutton"
        style={{ textAlign: 'left', border: '0px', backgroundColor: 'transparent', width: '100%' }}
        onClick={() => { navigate(-1); onClose() }}
      >
        ← Go Back
      </button>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/home" onClick={onClose}>The Office</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/library?action=charge" onClick={onClose}>Charge Sigil</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/library?action=destroy" onClick={onClose}>Destroy Sigil</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/make-sigil" onClick={onClose}>Make Sigil</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/library" onClick={onClose}>Sigil Library</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/map" onClick={onClose}>SigilMap</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/profile" onClick={onClose}>SigiLites</Link>
      <Link className="glassbutton" style={{ border: '0px', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }} to="/settings" onClick={onClose}>Settings</Link>
    </div>
  )
}

export default function Menu() {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) return null

  return (
    <div
      className="navmenu"
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
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
        </button>
      )}
      {menuOpen && <NavMenu onClose={() => setMenuOpen(false)} />}
    </div>
  )
}