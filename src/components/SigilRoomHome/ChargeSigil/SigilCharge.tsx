import Menu from '../../Parts/Menu'
import { useNavigate, useSearchParams } from "react-router-dom"
import ChangeEmotion from './ChargeComponents/ChangeEmotion'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext'
import SplashCursor from './ChargeComponents/SplashCursor'
import { usePageTutorial } from '../../../context/TutorialContext';
import TutorialCharacters from '../../Tutorial/Tutorialcharacters';


export default function ChargeSigil() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const { user } = useUser()
  const navigate = useNavigate()
  const [sigilData, setSigilData] = useState<any>(null)
  const [emotion, setEmotion] = useState("")
  const [isCharging, setIsCharging] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 2160, height: 1260 });
  const [showInstruction, setShowInstruction] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { currentStep: tutorialStep, isActive, advance, skip } = usePageTutorial('charge');
  const showTutorialNext = isActive && tutorialStep?.advanceOn === 'next';
  const showTutorialSkip = isActive && (tutorialStep?.skippable ?? false);
  const isLastStep = tutorialStep?.id === 14;

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
    if (!sigilData) return;
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    }, 150);
  }, [sigilData, dims]);

  useEffect(() => {
    if (!sigilId) { return }
    fetch(`/api/sigils/${sigilId}`)
      .then(res => res.json())
      .then(data => setSigilData(data))
      .catch(err => console.error(err))
  }, [sigilId])

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/sigils/${sigilData.id}/charge`, { method: 'PATCH' });
      if (!res.ok) { throw new Error('Failed to charge sigil'); }
      const updatedSigil = await res.json();
      if (isActive && isLastStep) advance();
      setTimeout(() => navigate(`/sigil-page?sigilId=${updatedSigil.id}`), 100)
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) { return null }
  if (!sigilData) { return <p>Loading Sigil!</p> }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer' style={{ overflowX: isCharging ? 'hidden' : 'scroll' }}>
        {showInstruction && (
          <div className="floating-instruction">
            Trace your sigil to imbue it with your chosen emotion
          </div>
        )}
        <div className='chargesigil art-page-base' style={{
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          backgroundColor: isCharging ? '#000000' : undefined,
          transition: 'background-color 800ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Menu />
          {isCharging && (
            <SplashCursor
              BACK_COLOR={{ r: 0, g: 0, b: 0 }}
              TRANSPARENT={true}
              SPLAT_RADIUS={0.2}
              SPLAT_FORCE={6000}
              DENSITY_DISSIPATION={3.5}
              VELOCITY_DISSIPATION={2}
            />
          )}
          <div ref={cardRef} style={{
            position: 'relative',
            zIndex: 10,
            width: '88dvw',
            height: '88dvh',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',
            borderRadius: '2rem',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>Charge Sigil</h1>
            {sigilData.imageData && (
              <img
                src={sigilData.imageData}
                alt={sigilData.name}
                className={isCharging ? 'sigil-charging' : ''}
                style={{
                  width: 'min(60vw, 50vh)',
                  aspectRatio: '1 / 1',
                  objectFit: 'contain',
                  filter: isCharging ? undefined : 'drop-shadow(0 0 24px var(--theme-glow))',
                  transition: 'all 800ms ease',
                  pointerEvents: 'none',
                  position: 'relative',
                  zIndex: 60,
                }}
              />
            )}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              overflow: 'hidden',
            }}>
              <div style={{
                transform: 'scale(1.6)',
                transformOrigin: 'center top',
                marginBottom: '1rem',
                width: '60%',
                display: 'flex',
                justifyContent:'center',
              }}>
                <ChangeEmotion emotion={emotion} setEmotion={setEmotion} />
              </div>
              {!isCharging && emotion && (
                <button className='glassbutton'
                  style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}
                  onClick={() => {
                    if (isActive && isLastStep) advance();
                    setIsCharging(true);
                    setShowInstruction(true);
                    setTimeout(() => setShowInstruction(false), 4000);
                  }}>
                  Charge Sigil
                </button>
              )}
              {isCharging && (
                <>
                  <button className='glassbutton'
                    style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}
                    onClick={handleSave}>
                    Save your Sigil!
                  </button>
                  <button className='glassbutton'
                    style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}
                    onClick={() => setTimeout(() => navigate(`/destroy-sigil?sigilId=${sigilData.id}`), 100)}>
                    Destroy Your Charged Sigil!
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isActive && tutorialStep && !isCharging && (
        <TutorialCharacters
          step={tutorialStep}
          onNext={advance}
          onSkip={skip}
          cardRef={cardRef}
          showNext={showTutorialNext}
          showSkip={showTutorialSkip}
        />
      )}
    </div>
  )
}