import { Link } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useEffect, useRef, useState } from 'react';
import Menu from "@/components/Parts/Menu";
import mapButton from '../../../assets/MapButton.svg'
import profileButton from '../../../assets/ProfileButton.svg'
import sigilbookButton from '../../../assets/SigilBook.svg'

export default function Grimoire() {
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

  if (!user) { return null; }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className='grimoire art-page-base' style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <Link
            className="grimoiremaplink"
            to="/map"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
          >
            <img src={mapButton} alt="Map Book" />
          </Link>
          <Link
            className="grimoireprofilelink"
            to="/profile"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
          >
            <img src={profileButton} alt="Profile Book" />
          </Link>
          <Link
            className="grimoireliblink"
            to="/right-page"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
          >
            <img src={sigilbookButton} alt="Sigil Book" />
          </Link>
        </div>
      </div>
    </div>
  )
}