
import { useUser } from '@/context/UserContext'
import UserFriends from './UserFriends'
import Menu from '../../../../Parts/Menu'
import { useRef, useEffect, useState } from 'react'

export default function UserProfile() {
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ width: 2160, height: 1260 })

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 }, 50)
  }, [dims])

  if (!user) return;

  const AvatarFace = () => (
    <div className="avatarfacebox">
      <img className="avatarface" src={`Avatar${user.avatar + 1}face.png`} style={{ height: 'clamp(40px, 8vw, 100px)' }} />
    </div>
  )

  const themeLabel = user.color_theme === 'foliage' ? '🌿 Verdant' : '❄️ Glacial'
  const lightLabel = user.theme === 1 ? '🌑 Dark' : '☀️ Light'
  const location = user.homeLocation ? (() => {
    try { return JSON.parse(user.homeLocation).name ?? user.homeLocation }
    catch { return user.homeLocation }
  })() : null

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="profilepage art-page-base"
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <h1 className='profilepagename' style={{ margin: 'clamp(8px, 2vw, 50px)', fontSize: 'clamp(20px, 4vw, 48px)' }}>
            <AvatarFace /> {user.username}
          </h1>

          <div className='glasscard' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            maxWidth: '90vw',
            padding: '25px',
            borderRadius: '12px',
            width: 'fit-content',
            maxHeight: '15dvh',
            height: 'fit-content',
            fontSize: 'clamp(11px, 1.8vw, 18px)',
          }}>
            <div style={{ display: 'flex', gap: 'clamp(0.4rem, 2vw, 1.5rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span>✨ {user.sigilCount ?? 0} Sigils Created</span>
              <span>💀 {user.destroyCount ?? 0} Sigils Destroyed</span>
              <span>{themeLabel}</span>
              <span>{lightLabel}</span>
            </div>
            {location && <span style={{ opacity: 0.8, textAlign: 'center' }}>🏠 {location}</span>}
          </div>

          <UserFriends />
        </div>
      </div>
    </div>
  )
}