import { useState } from 'react'
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { useUser } from '@/context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import Menu from '../../../../Parts/Menu'


const AvatarSelector = ({ avatarId, onSelect }: { avatarId: string, onSelect: (id: string) => void }) => {
  return (
    <div className="flex gap-4">
      {["0", "1"].map((id) => (
        <img
          key={id}
          src={`Avatar${parseInt(id) + 1}.png`}
          className={`avatar cursor-pointer border-4 rounded-full ${avatarId === id ? "border-purple-500" : "border-transparent"}`}
          onClick={() => onSelect(id)}
        />
      ))}
    </div>
  )
}

const Themebox = () => {
  const { user } = useUser()
  if (!user) { return null }
  const theme = user.theme;
  const colorTheme = user.color_theme ?? 'cyber'
  const isDark = theme === 1
  const labels = {
    'cyber-light': 'You have theme: Glacial · Setting: Light',
    'cyber-dark': 'You have theme: Glacial · Setting: Dark',
    'foliage-light': 'You have theme: Verdant · Setting: Light',
    'foliage-dark': 'You have theme: Verdant · Setting: Dark',
  }

  const swatches = {
    'cyber-light': [
      '#e9edf5', // --theme-bg-1 (light base)
      '#d8e0ef', // --theme-bg-2
      '#4b5563', // --theme-accent (UI neutral layer)
      '#00d4ff', // --theme-glow / cyber accent
    ],

    'cyber-dark': [
      '#0f1117', // --theme-bg-1 (dark base)
      '#1a1d26', // --theme-bg-2
      '#9ca3af', // muted accent
      '#00d4ff', // neon glow
    ],

    'foliage-light': [
      '#e4efe0', // --theme-bg-1
      '#cfe3c8', // --theme-bg-2
      '#4f6f52', // --theme-accent
      '#66bb6a', // --theme-glow
    ],

    'foliage-dark': [
      '#081c0c', // --theme-bg-1
      '#0f2a14', // --theme-bg-2
      '#66bb6a', // accent
      '#a5d6a7', // glow highlight
    ],
  }
  const key = `${colorTheme}-${isDark ? 'dark' : 'light'}` as keyof typeof swatches
  return (
    <div className="themebox" style={{ color: 'black' }}>
      {labels[key]}
      <div className="flex gap-2 mt-2">
        {swatches[key].map((color, i) => (
          <div key={i} style={{ backgroundColor: color, width: 32, height: 32, borderRadius: 6, borderWidth: "2px", borderColor: "black", alignSelf: "center" }} />
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
    document.documentElement.classList.toggle("dark", checked)
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
    document.documentElement.classList.remove('theme-foliage')
    if (next === 'foliage') document.documentElement.classList.add('theme-foliage');
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

  return (
    <div className="maincontainer">
      <div className="usersettings">
        <Menu />
        <h1 style={{ fontSize: 32 }}>User Settings</h1>
        <br />
        <AvatarSelector avatarId={avatarId} onSelect={handleAvatarChange} />
        <br />

        <label className="flex items-center gap-2">
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
        <br />
        <label className="flex items-center gap-">
          Colour Theme:
          <SwitchPrimitive.Root
            checked={colorTheme === 'foliage'}
            onCheckedChange={handleColorThemeChange}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-400 data-[state=checked]:bg-green-500"
          >
            <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6" />
          </SwitchPrimitive.Root>
          {colorTheme === 'foliage' ? "Foliage" : "Cyber"}
        </label>
        <br />
        <div className='avatarandtheme'>

          <Themebox />
        </div>

        <div className="flex flex-col gap-4 items-center just">
          <button style={{  borderRadius: "12px" }}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
            onClick={handleReplayTutorial}
          >
            Replay Tutorial
          </button>
          <button style={{ margin: "5px", borderRadius: "12px" }} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95" onClick={handleLogout}>
            Log Out
          </button>
          <Link style={{ margin: "5px", borderRadius: "12px" }} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95" to="/profile">Go to Profile </Link>
        </div>
      </div>
    </div>
  )
}
