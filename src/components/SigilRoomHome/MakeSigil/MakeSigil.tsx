import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import Menu from '../../Parts/Menu'

export default function MakeSigil() {
  const { user } = useUser()
  const navigate = useNavigate()
  const [sigilCount, setSigilCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [canCreateMore, setCanCreateMore] = useState(true)
  const [remainingSlots, setRemainingSlots] = useState(12)
  const [dims, setDims] = useState({ width: 2160, height: 1260 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const MAX_SIGILS = 12

  useEffect(() => {
    if (user) checkSigilCount()
  }, [user])

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
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    }, 50)
  }, [dims])

  const checkSigilCount = async () => {
    if (!user) return null
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(`/api/sigils/user/${user.id}/count`)
      const data = response.data
      setSigilCount(data.count)
      setCanCreateMore(data.canCreateMore)
      setRemainingSlots(data.remainingSlots)
    } catch (err) {
      console.error('Error checking sigil count:', err)
      setError('Failed to load sigil count. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSigil = () => {
    if (canCreateMore) {
      navigate('/make-sigil/write')
    } else {
      alert('You have reached the maximum limit of 12 sigils.\n\nPlease destroy an existing sigil before creating a new one.')
    }
  }

  if (!user) return null

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer' style={{ alignItems: 'center' }}>
        <div className='makesigil art-page-base' style={{ width: `${dims.width}px`, height: `${dims.height}px` }}>
          <Menu />
          <div className='glasscard' style={{
            position: 'relative',
            zIndex: 2,
            width: '55dvh',
            height: '88dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2rem',

          }}>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 72px)" }}>Make a Sigil</h1>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
              <p style={{ fontSize: "clamp(18px, 3.5vw, 48px)" }}>Current Sigils: {sigilCount}/{MAX_SIGILS}</p>
              {remainingSlots < 3 && (
                <p className="info-text warning">
                  ⚠️ {remainingSlots} slot(s) remaining.{' '}
                  {remainingSlots === 0 ? 'You will have to destroy a Sigil before you can create a new sigil. Visit your Library to select and destroy Sigils.' : ''}
                </p>
              )}
              {error && <p className="info-text error">{error}</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <button
                className="btn"
                onClick={handleCreateSigil}
                disabled={loading || !canCreateMore}
                style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}>
                {loading ? 'Loading...' : canCreateMore ? 'Create New Sigil' : 'Max Limit Reached'}
              </button>
              <Link className="btn" to="/library"
                style={{ fontSize: "clamp(15px, 2.5vw, 20px)", padding: "10px 32px" }}>
                Sigil Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
