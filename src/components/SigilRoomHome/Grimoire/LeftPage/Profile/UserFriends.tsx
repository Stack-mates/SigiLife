import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'



export default function UserFriends() {
  const { user } = useUser()
  if (!user) return null

  const [mutual, setMutual] = useState<any[]>([])
  const [onlyFollowing, setOnlyFollowing] = useState<any[]>([])
  const [onlyFollowers, setOnlyFollowers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isNarrow, setIsNarrow] = useState(window.innerWidth < 500)

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 500)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => { fetchFollowData() }, [user.id])

  const UserCard = ({ user, action, actionLabel, showAvatar = true }: {
  user: any, action?: () => void, actionLabel?: string, showAvatar?: boolean
}) => (
  <div className="usercard">
    {showAvatar && (
      <img src={`/Avatar${parseInt(user.avatar) + 1}face.png`} className="avatar"
        style={{ width: "20px", height: "20px", borderRadius: "12px", flexShrink: 0 }} />
    )}
    <label className="pompiereregular" style={{ fontSize: "clamp(12px, 1.5vw, 18px)", padding: "4px 8px", flexShrink: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {user.username}
    </label>
    {action && (
      <button onClick={action} className="pinkbutton ml-auto pompiereregular"
        style={{ fontSize: "clamp(12px, 1.5vw, 18px)", padding: "4px clamp(4px, 1vw, 12px)", flexShrink: 0 }}>
        {isNarrow ? '✕' : (actionLabel ?? '✕')}
      </button>
    )}
  </div>
)

  const fetchFollowData = async () => {
    const [followersRes, followingRes] = await Promise.all([
      fetch(`/api/users/${user.id}/followers`),
      fetch(`/api/users/${user.id}/following`)
    ])
    const followers = await followersRes.json()
    const following = await followingRes.json()
    const followerIds = new Set(followers.map((u: any) => u.id))
    const followingIds = new Set(following.map((u: any) => u.id))
    setMutual(followers.filter((u: any) => followingIds.has(u.id)))
    setOnlyFollowers(followers.filter((u: any) => !followingIds.has(u.id)))
    setOnlyFollowing(following.filter((u: any) => !followerIds.has(u.id)))
    const allFollowingIds = new Set(following.map((u: any) => u.id))
    setSearchResults(prev => prev.filter((u: any) => !allFollowingIds.has(u.id)))
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`)
    const data = await res.json()
    const followingIds = new Set([...mutual, ...onlyFollowing].map((u: any) => u.id))
    setSearchResults(data.filter((u: any) => u.id !== user.id && !followingIds.has(u.id)))
    setHasSearched(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setHasSearched(false)
  }

  const handleFollow = async (targetId: number) => {
    await fetch(`/api/users/follow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: user.id, followingId: targetId })
    })
    await fetchFollowData()
  }

  const handleUnfollow = async (targetId: number) => {
    await fetch(`/api/users/unfollow`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: user.id, followingId: targetId })
    })
    await fetchFollowData()
  }

  return (
    <div className='userfriendsbox'>
      <h1 style={{ fontSize: 'clamp(18px, 3vw, 32px)' }}>Your SigiLites</h1>
      <div className="userfriends">
        <h1 style={{ fontSize: 'clamp(15px, 2.5vw, 28px)' }}>Find Friends to Follow</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              className="textinput"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); if (!e.target.value) clearSearch() }}
              onKeyDown={e => { if (e.key === "Enter") handleSearch() }}
              placeholder="Search by username..."
              style={{ paddingRight: searchQuery ? '2rem' : undefined, fontSize: 'clamp(12px, 1.5vw, 16px)' }}
            />
            {searchQuery && (
              <button onClick={clearSearch} style={{
                position: 'absolute', right: '0.5rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'inherit', fontSize: '1rem', lineHeight: 1, padding: 0
              }}>✕</button>
            )}
          </div>
          <button onClick={handleSearch} style={{ borderRadius: "12px" }}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95">
            🔍
          </button>
        </div>

        {searchResults.length > 0 && searchResults.map(u => (
          <UserCard key={u.id} user={u} action={() => handleFollow(u.id)} actionLabel="Follow" />
        ))}
        {hasSearched && searchResults.length === 0 && (
          <p className="text-sm text-gray-400">No results found</p>
        )}
      </div>

      <div className='friendcontainer'>
        <div className="profilebox">
          <h3 style={{ fontSize: 'clamp(12px, 2vw, 22px)' }}>Followers</h3>
          {onlyFollowers.length === 0
            ? <p className="text-sm text-gray-400">No followers</p>
            : onlyFollowers.map(u => <UserCard key={u.id} user={u} showAvatar={false} />)}
        </div>
        <div className="profilebox">
          <h3 style={{ fontSize: 'clamp(12px, 2vw, 22px)' }}>SigilFriends</h3>
          {mutual.length === 0
            ? <p className="text-sm text-gray-400">No SigilFriends</p>
            : mutual.map(u => <UserCard key={u.id} user={u} showAvatar={false} action={() => handleUnfollow(u.id)} actionLabel="Unfollow" />)}
        </div>
        <div className="profilebox">
          <h3 style={{ fontSize: 'clamp(12px, 2vw, 22px)' }}>Following</h3>
          {onlyFollowing.length === 0
            ? <p className="text-sm text-gray-400">No following</p>
            : onlyFollowing.map(u => <UserCard key={u.id} user={u} showAvatar={false} action={() => handleUnfollow(u.id)} actionLabel="Unfollow" />)}
        </div>
      </div>
    </div>
  )
}