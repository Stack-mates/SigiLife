import { useUser } from '@/context/UserContext'
import UserFriends from './UserFriends'
import Menu from '../../../../Parts/Menu'
import { useRef, useEffect } from 'react'

export default function UserProfile() {
  const { user } = useUser()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

  if (!user) { return null }




  const AvatarFace = () => (
    <div className="avatarfacebox">
      <img className="avatarface" src={`Avatar${user.avatar + 1}face.png`} />
    </div>
  )



  return (
    <div className="maincontainer">
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="profilepage art-page-base">
          <Menu />
            <h1 className='profilepagename'>
              <AvatarFace /> {user.username}</h1>
            <UserFriends />

          </div>
        </div>
    </div>
  )
}