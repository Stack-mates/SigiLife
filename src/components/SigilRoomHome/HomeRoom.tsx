import { Link } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useEffect, useRef, useState } from 'react';
import Menu from '../Parts/Menu'
import destroyButton from '../../assets/DestroyButton.svg'
import chargeButton from '../../assets/AltarButton.svg'
import grimoireButton from '../../assets/GrimoireButton.svg'
import makesigilButton from '../../assets/WritingButton.svg'
import TutorialOverlay from '../ui/TutorialOverlay'

export default function HomeRoom() {
  const { user, isLoading } = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTutorial, setShowTutorial] = useState(false);
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
    if (user && !user.hasCompletedTutorial) {
      setTimeout(() => setShowTutorial(true), 0);
    }
  }, [user]);

  if (isLoading) return <div className='maincontainer'></div>
  if (!user) { return null; }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div
          className='homeroom art-page-base'
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}
        >
          <Menu />
          <Link id='destroy-btn' className='destroybutton' to="/library?action=destroy"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}>
            <img src={destroyButton} alt="Destroy Sigil" />
          </Link>
          <Link id='charge-btn' className='chargebutton' to="/library?action=charge"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}>
            <img src={chargeButton} alt="Charge Sigil" />
          </Link>
          <Link id='grimoire-btn' className='grimoirebutton' to="/grimoire"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}>
            <img src={grimoireButton} alt="Grimoire" />
          </Link>
          <Link id='makesigil-btn' className='makesigilbutton' to="/make-sigil"
            onTouchStart={(e) => e.currentTarget.classList.add('touched')}
            onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}>
            <img src={makesigilButton} alt="Write Sigil" />
          </Link>
        </div>
        {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
      </div>
    </div>
  )
}