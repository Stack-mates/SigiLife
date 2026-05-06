import { useState, useRef, useEffect } from 'react'
import Menu from '../../Parts/Menu'
import { useSearchParams, useNavigate } from "react-router-dom"
import ChangeEmotion from '../ChargeSigil/ChargeComponents/ChangeEmotion'
import EvilEye from './DestroyComponents/EvilEye'
import { useUser } from '@/context/UserContext'
import GhostCursor from './DestroyComponents/GhostCursor.tsx'

export default function DestroySigil() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const [dims, setDims] = useState({ width: 2160, height: 1260 })
  const { user } = useUser()
  const [sigilData, setSigilData] = useState<any>(null)
  const [emotion, setEmotion] = useState("")
  const [isDestroying, setIsDestroying] = useState(false)
  const [showInstruction, setShowInstruction] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const eyeContainerRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({
        width: Math.round(2160 * scale),
        height: window.innerHeight,
      })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    if (!sigilData) return
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    }, 150)
  }, [sigilData, dims])

  useEffect(() => {
    if (!sigilId) return
    fetch(`/api/sigils/${sigilId}`)
      .then(res => res.json())
      .then(data => setSigilData(data))
      .catch(err => console.error(err))
  }, [sigilId])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const eyeEl = eyeContainerRef.current
    if (!eyeEl) return
    const rect = eyeEl.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    setMousePos({ x, y })
  }

  const handleDestroy = async () => {
    if (isSubmitting) return
    try {
      const res = await fetch(`/api/sigils/${sigilData.id}`, { method: 'DELETE' })
      if (!res.ok) { throw new Error('Failed to destroy sigil') }
      setIsDestroying(true)
      setShowInstruction(true)
      setTimeout(() => setShowInstruction(false), 6000)
    } catch (error) {
      console.error('destroy error:', error)
      setIsSubmitting(false)
    }
  }

  if (!user) { return null }
  if (!sigilData) { return <p>Loading sigil...</p> }

  return (
    <div className='maincontainer'>
      {showInstruction && (
        <div className="floating-instruction">
          Trace your sigil to imbue it with your chosen emotion
        </div>
      )}
      <div ref={scrollRef} className={`scrollcontainer ${isDestroying ? 'noscroll' : ''}`}>
        <div className='destroysigil'
          onMouseMove={isDestroying ? handleMouseMove : undefined}
          style={{
            width: `${dims.width}px`,
            height: `${dims.height}px`,
            backgroundColor: isDestroying ? '#000000' : undefined,
            transition: 'background-color 800ms ease',
          }}>
          <Menu />

          {sigilData.imageData && (
            <img
              src={sigilData.imageData}
              alt={sigilData.name}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(60vw, 50vh)',
                aspectRatio: '1 / 1',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 24px var(--theme-glow))',
                transition: 'all 800ms ease',
                pointerEvents: 'none',
                zIndex: 60,
              }}
            />
          )}

          {isDestroying && (
            <>
              <div className='evileye' ref={eyeContainerRef}>
                <EvilEye
                  eyeColor="#2e0fa9"
                  intensity={3.1}
                  pupilSize={0.75}
                  irisWidth={0.25}
                  glowIntensity={0.65}
                  scale={0.5}
                  noiseScale={1}
                  pupilFollow={1.6}
                  flameSpeed={2.5}
                  backgroundColor="#06000f"
                  externalMouse={mousePos}
                />
              </div>
              <GhostCursor
                zIndex={1}
                color="#e74040"
                brightness={2}
                edgeIntensity={0}
                trailLength={50}
                inertia={0.5}
                grainIntensity={0.05}
                bloomStrength={0.1}
                bloomRadius={1}
                bloomThreshold={0.025}
                fadeDelayMs={1000}
                fadeDurationMs={1500}
              />
            </>
          )}

          <div style={{
            position: 'relative',
            zIndex: 10,
            width: '88dvw',
            height: '88dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',
            borderRadius: '2rem',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)" }}>Destroy Sigil</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <div style={{ transform: 'scale(1.6)', transformOrigin: 'center', marginBottom: '1rem', position: 'relative', zIndex: 300 }}>
                <ChangeEmotion emotion={emotion} setEmotion={setEmotion} />
              </div>
              {!isDestroying && emotion && (
                <button className="glassbutton"
                  style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}
                  onClick={handleDestroy}
                  disabled={isSubmitting}>
                  Destroy Sigil
                </button>
              )}
              {isDestroying && (
                <button className="glassbutton"
                  style={{ position: 'relative', zIndex: 20, fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}
                  onClick={() => {
                    setIsDestroying(false)
                    setTimeout(() => navigate('/home'), 200)
                  }}>
                  Go Home
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}