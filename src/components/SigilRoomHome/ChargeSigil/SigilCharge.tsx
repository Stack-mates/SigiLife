import Menu from '../../Parts/Menu'
import { useNavigate, useSearchParams } from "react-router-dom"
import ChangeEmotion from './ChargeComponents/ChangeEmotion'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext'
import SplashCursor from './ChargeComponents/SplashCursor'

export default function ChargeSigil() {
  const [searchParams] = useSearchParams()
  const sigilId = searchParams.get('sigilId')
  const { user } = useUser()
  const navigate = useNavigate()
  const [sigilData, setSigilData] = useState<any>(null)
  const [emotion, setEmotion] = useState("")
  const [isCharging, setIsCharging] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sigilData) { return }
    const el = scrollRef.current;
    if (!el) { return; }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, [sigilData])

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
        <div
          className='chargesigil'
          style={{
            backgroundColor: isCharging ? '#000000' : undefined,
            transition: 'background-color 800ms ease',
          }}
        >
          <Menu />


          <h1 style={{ fontSize: 32, borderRadius: '12px', position: 'relative', zIndex: 20 }}>Charge Sigil</h1>
          {sigilData.imageData && (
            <img
              src={sigilData.imageData}
              alt={sigilData.name}
              className='glasscard'
              style={{
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                borderRadius: '12px',
                transition: 'all 800ms ease',
                position: 'relative',
                zIndex: 25,
              }}
            />
          )}
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

          <ChangeEmotion emotion={emotion} setEmotion={setEmotion} />

          {!isCharging && (
            <button
              className='navbutton'
              style={{ position: 'relative', zIndex: 20, backgroundColor: "#e0e0e0" }}
              onClick={() => setIsCharging(true)}
              disabled={!emotion}
            >
              Charge Sigil
            </button>
          )}

          {isCharging && (
            <button
              className='navbutton'
              style={{ position: 'relative', zIndex: 20, backgroundColor: "#e0e0e0" }}
              onClick={handleSave}
            >
              Save your Sigil!
            </button>
          )}

          {isCharging && (
            <button
              className='navbutton'
              style={{ position: 'relative', zIndex: 20, backgroundColor: "#e0e0e0" }}
              onClick={() => setTimeout(() => navigate(`/destroy-sigil?sigilId=${sigilData.id}`), 100)}
            >
              Destroy Your Charged Sigil!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}