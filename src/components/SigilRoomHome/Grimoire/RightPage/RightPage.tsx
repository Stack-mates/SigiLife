
import SigiLibrary from './SigiLibrary/SigiLibrary'
import { useEffect, useState, useRef } from 'react'
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'

export default function RightPage() {
  const [sigils, setSigils] = useState([])
  const { user } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 2160, height: 1260 });

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260;
      setDims({
        width: Math.round(2160 * scale),
        height: window.innerHeight,
      });
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, 50);
  }, [dims]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/sigils/user/${user.id}/sigils`)
      .then(res => res.json())
      .then(data => setSigils(data))
  }, [user])

  if (!user) { return null }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="rightpage2 art-page-base" style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <br/>

          <div className='glasscard' style={{
            position: 'relative',
            flex: '1',
            top:'0dvh',
            left: '55dvh',
            width: '55dvh',
            height: '88dvh',
         }}>
          <h2>{user.username}'s Sigils</h2>
            <SigiLibrary items={sigils} user={user} /></div>
        </div>
      </div>
    </div>
  )
}