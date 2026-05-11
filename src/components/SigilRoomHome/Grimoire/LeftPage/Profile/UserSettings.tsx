import { useState } from 'react'
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { useUser } from '@/context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import Menu from '../../../../Parts/Menu'

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
    label: 'Glacial · Light',
    colors: ['#f0f8ff', '#dbeafe', '#1a6fff', 'rgba(26,111,255,0.45)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'cyber-dark': {
    label: 'Glacial · Dark',
    colors: ['#000000', '#050d1a', '#4169e1', 'rgba(65,105,225,0.75)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'foliage-light': {
    label: 'Verdant · Light',
    colors: ['#f0fff4', '#d1fae5', '#2e8b57', 'rgba(46,139,87,0.45)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'foliage-dark': {
    label: 'Verdant · Dark',
    colors: ['#000000', '#030f07', '#50c878', 'rgba(80,200,120,0.75)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'default-light': {
    label: 'Default · Light',
    colors: ['#ffffff', '#f0f0f0', '#9e38fd', 'rgba(158,56,253,0.4)'],
    names: ['Background', 'Surface', 'Button', 'Glow'],
  },
  'default-dark': {
    label: 'Default · Dark',
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
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.15)',
      backdropFilter: 'blur(12px)',
      minWidth: '200px',
    }}>
      <span style={{ fontFamily: 'New Rocker, system-ui', fontSize: 'clamp(14px,2vw,18px)', color: 'var(--theme-text)' }}>
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
            <span style={{ fontSize: '9px', color: 'var(--theme-text)', opacity: 0.7, fontFamily: 'Special Elite, system-ui' }}>
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
    navigate('/home')
  }

  if (!user) return null

  return (
    <div className="maincontainer">
      <div className="usersettings art-page-base">
        <Menu />
        <h1>User Settings</h1>

        <AvatarSelector avatarId={avatarId} onSelect={handleAvatarChange} />

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
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Colour Theme:
          <SwitchPrimitive.Root
            checked={colorTheme === 'foliage'}
            onCheckedChange={handleColorThemeChange}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-400 data-[state=checked]:bg-green-500"
          >
            <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
          </SwitchPrimitive.Root>
          {colorTheme === 'foliage' ? "Verdant" : "Glacial"}
        </label>

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
        </div>
      </div>
    </div>
  )
}