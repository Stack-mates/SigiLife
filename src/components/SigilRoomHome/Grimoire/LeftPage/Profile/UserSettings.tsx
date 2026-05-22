import { useState, useEffect, useRef } from 'react'
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { useUser } from '@/context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import Menu from '../../../../Parts/Menu'
import { clearTutorialSession } from '@/components/Tutorial/Tutorialscript'

function applyThemeClasses(theme: number, colorTheme: string) {
  const html = document.documentElement;
  html.classList.toggle("dark", theme === 1);
  html.classList.remove("theme-cyber", "theme-foliage");
  if (colorTheme === "foliage") html.classList.add("theme-foliage");
  if (colorTheme === "cyber") html.classList.add("theme-cyber");
}

const AvatarSelector = ({ avatarId, onSelect }: { avatarId: string, onSelect: (id: string) => void }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {["0", "1"].map((id) => (
        <img
          key={id}
          src={`Avatar${parseInt(id) + 1}.png`}
          className="avatar"
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
            border: avatarId === id ? '4px solid var(--theme-btn)' : '4px solid transparent',
          }}
          onClick={() => onSelect(id)}
        />
      ))}
    </div>
  )
}

const SWATCHES = {
  'cyber-light': {
    label: 'Glacial Colours & Light Background',
    colors: ['#f0f8ff', '#dbeafe', '#1a6fff', 'rgba(26,111,255,0.45)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'cyber-dark': {
    label: 'Glacial Colours & Dark Background',
    colors: ['#000000', '#050d1a', '#4169e1', 'rgba(65,105,225,0.75)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'foliage-light': {
    label: 'Verdant Colours & Light Background',
    colors: ['#f0fff4', '#d1fae5', '#2e8b57', 'rgba(46,139,87,0.45)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'foliage-dark': {
    label: 'Verdant Colours & Dark Background',
    colors: ['#000000', '#030f07', '#50c878', 'rgba(80,200,120,0.75)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'default-light': {
    label: 'Default Colours & Light Background',
    colors: ['#ffffff', '#f0f0f0', '#9e38fd', 'rgba(158,56,253,0.4)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'default-dark': {
    label: 'Default Colours & Dark Background',
    colors: ['#0a0a0a', '#141414', '#9e38fd', 'rgba(158,56,253,0.6)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
}

const Themebox = ({ colorTheme, isDark }: { colorTheme: string, isDark: boolean }) => {
  const suffix = isDark ? 'dark' : 'light'
  const key = colorTheme === 'foliage' || colorTheme === 'cyber'
    ? `${colorTheme}-${suffix}` as keyof typeof SWATCHES
    : `default-${suffix}` as keyof typeof SWATCHES
  const swatch = SWATCHES[key]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem',
      borderRadius: '12px',
      minWidth: '200px',
      width: '50dvw',
    }}>
      <span style={{ fontFamily: 'New Rocker, system-ui', fontSize: 'clamp(14px, 2.5vw, 36px)', color: 'var(--theme-text)' }}>
        {swatch.label}
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {swatch.colors.map((color, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              backgroundColor: color,
              width: 36,
              height: 36,
              borderRadius: 8,
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: `0 0 8px ${color}`,
            }} />
            <span style={{ fontSize: 'clamp(14px,2vw,18px)', color: 'var(--theme-text)', opacity: 0.7, fontFamily: 'Special Elite, system-ui' }}>
              {swatch.names[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function UserSettings() {
  const { user, setUser } = useUser()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(user!.theme === 1)
  const [avatarId, setAvatarId] = useState(String(user?.avatar ?? 0))
  const [colorTheme, setColorTheme] = useState(user?.color_theme ?? 'cyber')
  const [dims, setDims] = useState({ width: 2160, height: 1260 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<number | ''>('');
  const narrativeIds = [4, 9, 16];


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

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked)
    applyThemeClasses(checked ? 1 : 0, colorTheme)
    fetch(`/api/users/${user!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: checked ? 1 : 0 })
    })
      .then(res => res.json())
      .then(updated => setUser(updated))
  }

  const handleColorThemeChange = (checked: boolean) => {
    const next = checked ? 'foliage' : 'cyber'
    setColorTheme(next)
    applyThemeClasses(isDark ? 1 : 0, next)
    fetch(`/api/users/${user!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color_theme: next })
    })
      .then(res => res.json())
      .then(updated => setUser(updated))
  }

  const handleAvatarChange = async (id: string) => {
    setAvatarId(id)
    const res = await fetch(`/api/users/${user!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatar: parseInt(id) })
    })
    const updated = await res.json()
    setUser(updated)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    navigate('/')
  }

const handleReplayTutorial = async () => {
  const res = await fetch(`/api/users/${user!.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hasCompletedTutorial: false })
  })
  const updated = await res.json()
  setUser(updated)
  clearTutorialSession()
  sessionStorage.removeItem('sigilTutorialSkipped')
  navigate('/make-sigil')
}

  const handleSwitchUser = async (targetUserId: number) => {
    const res = await fetch('/api/auth/switch-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUserId })
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      navigate('/home');
    }
  };

  const handleSwitchBack = async () => {
    const res = await fetch('/api/auth/switch-back', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      navigate('/home');
    }
  };


  if (!user) return null
  const isPlayingAsCharacter = narrativeIds.includes(user.id);
  return (
    <div className="maincontainer">
      <div ref={scrollRef} className="scrollcontainer">
        <div
          className="usersettings-page art-page-base"
          style={{ width: `${dims.width}px`, height: `${dims.height}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Menu />
          <div className='glasscard' style={{
            position: 'relative',
            zIndex: 10,
            width: 'min(55dvh, 85dvw)',
            height: '88dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '2rem',
            borderRadius: '2rem',

            overflowY: 'auto',
            gap: '1rem',
          }}>
            <h1>Agent Settings</h1>
            <div>
              <p>Choose Costume:</p>
              <AvatarSelector avatarId={avatarId} onSelect={handleAvatarChange} /></div>
            <div>
              <p>Darkness Settings:</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Theme:
                <SwitchPrimitive.Root
                  checked={isDark}
                  onCheckedChange={handleThemeChange}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 data-[state=checked]:bg-purple-500"
                >
                  <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
                </SwitchPrimitive.Root>
                {isDark ? "Dark" : "Light"}
              </label></div>
            <div>
              <p>Choose Colour:</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Theme:
                <SwitchPrimitive.Root
                  checked={colorTheme === 'foliage'}
                  onCheckedChange={handleColorThemeChange}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-400 data-[state=checked]:bg-green-500"
                >
                  <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
                </SwitchPrimitive.Root>
                {colorTheme === 'foliage' ? "Verdant" : "Glacial"}
              </label>
            </div>
            <div className="avatarandtheme">
              <Themebox colorTheme={colorTheme} isDark={isDark} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <button className="btn" onClick={handleReplayTutorial}>
                Replay Tutorial
              </button>
              <button className="btn" onClick={handleLogout}>
                Log Out
              </button>
              <Link className="btn" to="/profile">
                Go to Profile
              </Link>

              {user.isAdmin && !isPlayingAsCharacter && (
                <>
                  <Link className="btn" to="/presentation">Presentation</Link>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <p>Play As:</p>
                    <select
                      value={selectedCharacter}
                      onChange={e => setSelectedCharacter(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="btn"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value=''>Select a character...</option>
                      <option value={4}>Harper Crowe</option>
                      <option value={9}>Morgan Lafayette</option>
                      <option value={16}>Bennet Voss</option>
                    </select>
                    <button
                      className="btn"
                      disabled={selectedCharacter === ''}
                      onClick={() => selectedCharacter !== '' && handleSwitchUser(selectedCharacter)}
                    >
                      Switch
                    </button>
                  </div>
                </>
              )}

              {isPlayingAsCharacter && (
                <button className="btn" onClick={handleSwitchBack}>
                  Switch Back to My Account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}