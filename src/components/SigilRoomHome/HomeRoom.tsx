

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);

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
        <div className='homeroom'>
          <Menu />

          <nav className=''>
            <Link
              id='destroy-btn'
              className='destroybutton'
              to="/library?action=destroy"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={destroyButton} alt="Destroy Sigil" />
            </Link>
            <Link
              id='charge-btn'
              className='chargebutton'
              to="/library?action=charge"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={chargeButton} alt="Charge Sigil" />
            </Link>
            <Link
              id='grimoire-btn'
              className='grimoirebutton'
              to="/grimoire"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={grimoireButton} alt="Grimoire" />
            </Link>
            <Link
              id='makesigil-btn'
              className='makesigilbutton'
              to="/make-sigil"
              onTouchStart={(e) => e.currentTarget.classList.add('touched')}
              onTouchEnd={(e) => e.currentTarget.classList.remove('touched')}
            >
              <img src={makesigilButton} alt="Write Sigil" />
            </Link>
          </nav>

          <div className='footer'>
          </div>
        </div>
      </div>
      {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
    </div>
  )

}

