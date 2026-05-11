import { useEffect, useState } from 'react';
import type { TutorialStep } from './Tutorialscript';
import HarperPortrait from '../../assets/HarperPortrait.svg';
import BennetPortrait from '../../assets/BennetPortrait.svg';
import SpeechBubbleLeft from '../../assets/SpeechBubbleLeft.svg';
import SpeechBubbleRight from '../../assets/SpeechBubbleRight.svg';

interface TutorialCharactersProps {
  step: TutorialStep;
  onNext?: () => void;
  onSkip?: () => void;
  showNext: boolean;
  showSkip: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!text) return;
    let index = 0;
    let lastTime = 0;
    let cancelled = false;
    const tick = (timestamp: number) => {
      if (cancelled) return;
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      if (elapsed >= speed) {
        lastTime = timestamp;
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { cancelled = true; setDisplayed(''); };
  }, [text, speed]);
  return displayed;
}

interface PortraitProps {
  src: string;
  side: 'left' | 'right';
  visible: boolean;
  stepId: number;
  delay?: number;
  xPos: number;
  width: number;
  height: number;
}

function Portrait({ src, side, visible, stepId, delay = 0, xPos, width, height }: PortraitProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const reset = setTimeout(() => setMounted(false), 0);
    const t = setTimeout(() => setMounted(true), delay + 50);
    return () => { clearTimeout(reset); clearTimeout(t); };
  }, [visible, delay, stepId]);

  const translateX = side === 'left' ? '-120%' : '120%';

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: xPos,
      width,
      height,
      zIndex: 8500,
      pointerEvents: 'none',
      transform: mounted ? 'translateX(0)' : `translateX(${translateX})`,
      transition: 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      willChange: 'transform',
    }}>
      <img src={src} alt="" style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'bottom',
        display: 'block',
        filter: 'drop-shadow(0 -4px 20px rgba(158,56,253,0.4))',
      }} />
    </div>
  );
}

interface SpeechBubbleProps {
  text: string;
  side: 'left' | 'right';
  stepId: number;
}

function SpeechBubblePanel({ text, side, stepId }: SpeechBubbleProps) {
  const [mounted, setMounted] = useState(false);
  const displayed = useTypewriter(mounted ? text : '');
  useEffect(() => {
    const reset = setTimeout(() => setMounted(false), 0);
    const t = setTimeout(() => setMounted(true), 100);
    return () => { clearTimeout(reset); clearTimeout(t); };
  }, [stepId, side]);

  const bubbleSrc = side === 'left' ? SpeechBubbleLeft : SpeechBubbleRight;

  return (
    <div style={{
      position: 'fixed',
      top: '18dvh',
      left: '50%',
      transform: mounted
        ? 'translateX(-50%) translateY(0) scale(1)'
        : 'translateX(-50%) translateY(-20px) scale(0.95)',
      opacity: mounted ? 1 : 0,
      transition: 'transform 400ms cubic-bezier(0.34, 1.2, 0.64, 1), opacity 300ms ease',
      width: 'min(55dvh, 85dvw)',

      zIndex: 8600,
      pointerEvents: 'none',
    }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={bubbleSrc} alt="" style={{
          width: '100%', height: 'auto', display: 'block',
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.9))',
        }} />
        <div style={{
          position: 'absolute', top: '15%', left: '10%', right: '10%', bottom: '22%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <p style={{
            margin: 0, fontFamily: 'Pompiere, cursive',
            fontSize: 'clamp(15px, 2.2vw, 22px)', lineHeight: 1.4,
            textAlign: 'center', color: '#1a0a2e',
            wordBreak: 'break-word', hyphens: 'auto',
          }}>
            {displayed}
            <span style={{
              display: 'inline-block', width: '2px', height: '1em',
              background: '#9e38fd', marginLeft: '2px', verticalAlign: 'middle',
              animation: 'tutorialCursorBlink 0.8s step-end infinite',
            }} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TutorialCharacters({
  step, onNext, onSkip, showNext, showSkip, cardRef,
}: TutorialCharactersProps) {
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const update = () => {
      if (cardRef?.current) setCardRect(cardRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [cardRef]);

  const showHarper = step.speaker === 'harper' || step.speaker === 'both';
  const showBennet = step.speaker === 'bennet' || step.speaker === 'both';

  const [activeSpeaker, setActiveSpeaker] = useState<'harper' | 'bennet'>('harper');

  useEffect(() => {
    const reset = setTimeout(() => setActiveSpeaker('harper'), 0);
    if (step.speaker === 'both' && step.bennetText) {
      const harperLen = step.harperText?.length ?? 0;
      const switchDelay = Math.max(3000, harperLen * 30 + 1000);
      const t = setTimeout(() => setActiveSpeaker('bennet'), switchDelay);
      return () => { clearTimeout(reset); clearTimeout(t); };
    }
    return () => clearTimeout(reset);
  }, [step.id]);

  const showHarperBubble = step.harperText && (
    step.speaker === 'harper' ||
    (step.speaker === 'both' && activeSpeaker === 'harper')
  );

  const showBennetBubble = step.bennetText && (
    step.speaker === 'bennet' ||
    (step.speaker === 'both' && activeSpeaker === 'bennet')
  );

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Portrait width scales with viewport — wider percentage on small screens
  const portraitWidth = vw < 500 ? vw * 0.42 : vw < 900 ? vw * 0.28 : vw * 0.20;
  const portraitHeight = vh * 0.55;

  const cardCenterX = cardRect
    ? cardRect.left + cardRect.width / 2
    : vw / 2;

  const harperX = cardCenterX - portraitWidth;
  const bennetX = cardCenterX;

  return (
    <>
      <style>{`
        @keyframes tutorialCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      {showHarper && (
        <Portrait
          src={HarperPortrait}
          side="left"
          visible={showHarper}
          stepId={step.id}
          delay={0}
          xPos={harperX}
          width={portraitWidth}
          height={portraitHeight}
        />
      )}

      {showBennet && (
        <Portrait
          src={BennetPortrait}
          side="right"
          visible={showBennet}
          stepId={step.id}
          delay={step.speaker === 'both' ? 400 : 0}
          xPos={bennetX}
          width={portraitWidth}
          height={portraitHeight}
        />
      )}

      {showHarperBubble && (
        <SpeechBubblePanel
          text={step.harperText!}
          side="left"
          stepId={step.id}
        />
      )}

      {showBennetBubble && (
        <SpeechBubblePanel
          text={step.bennetText!}
          side="right"
          stepId={step.id * 100}
        />
      )}

      {step.advanceOn === 'action' && step.actionHint && (
        <div style={{
          position: 'fixed', top: '8%', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9001, background: 'rgba(158,56,253,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(158,56,253,0.5)', borderRadius: '2rem',
          padding: '0.5rem 1.2rem', fontFamily: 'Pompiere, cursive',
          fontSize: 'clamp(13px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.85)',
          textAlign: 'center', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          ✦ {step.actionHint}
        </div>
      )}

      {(showNext || showSkip) && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 9002, display: 'flex', gap: '0.75rem', pointerEvents: 'auto',
        }}>
          {showSkip && (
            <button onClick={onSkip} style={{
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2rem',
              padding: '0.5rem 1.2rem', color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Pompiere, cursive', fontSize: 'clamp(13px, 1.8vw, 16px)',
              cursor: 'pointer', transition: 'all 200ms ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Skip tutorial
            </button>
          )}
          {showNext && (
            <button onClick={onNext} style={{
              background: 'linear-gradient(135deg, #9e38fd, #c56aff)', border: 'none',
              borderRadius: '2rem', padding: '0.55rem 1.6rem', color: 'white',
              fontFamily: 'Pompiere, cursive', fontSize: 'clamp(14px, 2vw, 18px)',
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(158,56,253,0.5)',
              transition: 'all 200ms ease', letterSpacing: '0.03em',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Next →
            </button>
          )}
        </div>
      )}
    </>
  );
}