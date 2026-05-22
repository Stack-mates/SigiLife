import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'
import axios from 'axios';
import { usePageTutorial } from '../../../../context/TutorialContext';
import TutorialCharacters from '../../../Tutorial/Tutorialcharacters';
import TutorialBlockOverlay from '../../../Tutorial/TutorialBlockOverlay';

export default function WriteSigil() {
  const { user } = useUser();
  const [intention, setIntention] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueChars, setUniqueChars] = useState('');
  const [charactersVisible, setCharactersVisible] = useState(true);
  const [dims, setDims] = useState({ width: 2160, height: 1260 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  const { currentStep, isActive, advance, skip, showOverlay } = usePageTutorial('write');



  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260;
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight });
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2; }, 50);
  }, [dims]);

  const getUniqueChars = async (text: string): Promise<{ chars: string; censored: string }> => {
    let censored = text;
    try {
      const response = await axios.post('/api/sigils/filter-content', { text });
      if (response.data?.censored) censored = response.data.censored;
    } catch (error) {
      console.error('Content filter failed, using raw text');
      censored = text;
    }
    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = censored.replace(nonAlphaOrVowels, '').toUpperCase();
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });
    return { chars: uniqueChars.join(''), censored };
  };

  useEffect(() => {
    let cancelled = false;
    getUniqueChars(intention).then(({ chars }) => {
      if (!cancelled) setUniqueChars(intention ? chars : '');
    });
    return () => { cancelled = true; };
  }, [intention]);

  const handleNext = async () => {
    if (!intention) return;
    setIsProcessing(true);
    const { chars, censored } = await getUniqueChars(intention);
    localStorage.setItem('sigilIntention', censored);
    localStorage.setItem('sigilUniqueChars', chars);
    setIsProcessing(false);
    if (isActive && currentStep?.id === 3) advance();
    navigate('/make-sigil/draw');
  };

  const showTutorialNext = isActive && currentStep?.advanceOn === 'next';
  const showTutorialSkip = isActive && (currentStep?.skippable ?? false);

  if (!user) return null;

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="writesigil art-page-base" style={{
          width: `${Math.max(dims.width, window.innerWidth)}px`, height: `${dims.height}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Menu />
          <div className='glasscard' ref={cardRef} style={{
            display: 'flex',
            position: 'relative',
            top: '0dvh',
            left: '0dvh',
            width: '55dvh',
            height: '88dvh',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            padding: '2rem',
            zIndex: showOverlay ? 1 : 'auto',
          }}>
            <h1>Write Your Sigil</h1>
            <p style={{ fontSize: "clamp(14px, 3.5vw, 32px)", marginTop: "0.5rem" }}>
              Your current intention:
            </p>
            <textarea
              className="textinput"
              style={{
                width: "100%", flex: "1", minHeight: "120px", padding: "15px", color: 'black',
                resize: "none", fontSize: "clamp(15px, 3.5vw, 42px)",
                opacity: showOverlay ? 0.3 : 1, transition: 'opacity 600ms ease',
              }}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="e.g. I am going to crush it today!"
              disabled={showOverlay}
            />
            <div className="clmnbox">
              <span style={{ color: 'black', fontSize: 'clamp(10px, 1.8vw, 26px)' }}>
                Unique letters: {uniqueChars}
              </span>

            </div>
            <button className="pinkbutton" onClick={handleNext}
              disabled={isProcessing || !intention}
              style={{
                backgroundColor: (isProcessing || !intention) ? '#ccc' : '#9e38fd',
                cursor: (isProcessing || !intention) ? 'not-allowed' : 'pointer',
              }}>
              {isProcessing ? "Processing..." : "Draw Sigil"}
            </button>
          </div>
        </div>

      </div>

      <TutorialBlockOverlay visible={showOverlay} />
      {isActive && currentStep && charactersVisible && (
        <TutorialCharacters
          step={currentStep}
          onNext={advance}
          onSkip={skip}
          showNext={showTutorialNext}
          showSkip={showTutorialSkip}
          cardRef={cardRef}
          onBennetFinished={() => {
            if (currentStep?.id === 3) {
              setTimeout(() => setCharactersVisible(false), 5000);
            }
          }}
        />
      )}
    </div>
  );
}