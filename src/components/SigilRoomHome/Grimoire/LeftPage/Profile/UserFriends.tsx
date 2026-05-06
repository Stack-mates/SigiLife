
import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'

const UserCard = ({ user, action,}: { user: any, action?: () => void, actionLabel?: string }) => {
  return (
    <div className="usercard">
      <img src={`Avatar${parseInt(user.avatar) + 1}face.png`} className="avatar" style={{width: "20px", height: "20px", borderRadius: "12px"}}/>
      <span>{user.username}</span>
      {action && (
        <button style={{borderRadius: "50%"}} onClick={action} className="ml-auto text-xsm px-2 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600">
          x
        </button>
      )}
    </div>
  )
}


export default function UserFriends() {
  const { user } = useUser()
  if (!user) { return null }

  const [mutual, setMutual] = useState<any[]>([])
  const [onlyFollowing, setOnlyFollowing] = useState<any[]>([])
  const [onlyFollowers, setOnlyFollowers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])


  useEffect(() => {
    fetchFollowData()
  }, [user.id])

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
    if (!searchQuery.trim()) { return }
    const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`)
    const data = await res.json()
    const followingIds = new Set([...mutual, ...onlyFollowing].map((u: any) => u.id))
    setSearchResults(data.filter((u: any) => u.id !== user.id && !followingIds.has(u.id)))
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
      <h1 style={{fontSize: 32}}> Your SigiLites </h1>
      <div className="userfriends">
        <h1>Find Friends to Follow</h1>
        <div >
          <input
            type="text"
            className="textinput"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { handleSearch() } }}
            placeholder="Search by username..."
          />
          <button style={{borderRadius: "12px"}} onClick={handleSearch} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95">
            🔍
          </button>
        </div>

        {searchResults.length > 0 && searchResults.map(u => (
          <UserCard key={u.id} user={u} action={() => handleFollow(u.id)} actionLabel="Follow" />
        ))}
        {searchResults.length === 0 && searchQuery && (
          <p className="text-sm text-gray-400">No results found</p>
        )}
      </div>

      <div className='friendcontainer'>
        <div className="profilebox">
          <h3>Followers</h3>
          {onlyFollowers.length === 0
            ? <p className="text-sm text-gray-400">No followers</p>
            : onlyFollowers.map(u => (
              <UserCard key={u.id} user={u} />
            ))
          }
        </div>
        <div className="profilebox">
          <h3>SigilFriends</h3>
          {mutual.length === 0
            ? <p className="text-sm text-gray-400">No SigilFriends</p>
            : mutual.map(u => (
              <UserCard key={u.id} user={u} action={() => handleUnfollow(u.id)} actionLabel="Unfollow" />
            ))
          }
        </div>
        <div className="profilebox">
          <h3>Following</h3>
          {onlyFollowing.length === 0
            ? <p className="text-sm text-gray-400">No following </p>
            : onlyFollowing.map(u => (
              <UserCard key={u.id} user={u} action={() => handleUnfollow(u.id)} actionLabel="Unfollow" />
            ))
          }
        </div>
      </div>

    </div>
  )
};