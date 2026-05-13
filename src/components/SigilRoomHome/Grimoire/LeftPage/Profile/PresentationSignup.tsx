import { useRef, useEffect, useState } from 'react'
import Menu from '../../../../Parts/Menu'
import GoogleAuth from '../../../../LogInAuth/GoogleAuth'
const EMAIL_LIST_ENDPOINT = '/api/email-signup'
// ─────────────────────────────────────────────────────────────────────────────

export default function PresentationSignup() {
  const scrollRef = useRef<HTMLDivElement>(null)


  const [dims, setDims] = useState({ width: 2160, height: 1260 })
  const [emailConsent, setEmailConsent] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight })
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2 }, 50)
  }, [dims])

  const handleEmailSubmit = async () => {
    if (!emailConsent || !emailInput.trim()) return
    setSubmitting(true)
    try {
      await fetch(EMAIL_LIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput.trim() }),
      })
    } catch (err) {
      console.error('Email signup error:', err)
    } finally {
      setSubmitted(true)
      setSubmitting(false)
    }
  }

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div
          className='presentationsignuppage art-page-base'
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}
        >
          <Menu />

          {/* ── Glass card centered on the page ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div className='glasscard' style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(14px, 2.2dvh, 28px)',
              padding: 'clamp(24px, 4dvh, 56px) clamp(28px, 5dvw, 72px)',
              maxWidth: 'clamp(320px, 55dvw, 720px)',
              width: '100%',
              textAlign: 'center',
            }}>

              {/* ── Heading ── */}
              <h1 style={{
                fontFamily: "'New Rocker', system-ui",
                fontSize: 'clamp(22px, 3.5dvh, 48px)',
                margin: 0,
                color: 'var(--theme-text)',
              }}>
                Thank you for attending
              </h1>
              <h2 style={{
                fontFamily: "'Pompiere', system-ui",
                fontSize: 'clamp(16px, 2.4dvh, 32px)',
                margin: 0,
                color: 'var(--theme-text)',
                opacity: 0.9,
              }}>
                our Presentation of SigiLife!
              </h2>

              <hr style={{
                width: '80%',
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                margin: 0,
              }} />

              {/* ── Email consent & input ── */}
              {!submitted ? (
                <>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: "'Pompiere', system-ui",
                    fontSize: 'clamp(14px, 2dvh, 22px)',
                    color: 'var(--theme-text)',
                    lineHeight: 1.4,
                  }}>
                    <input
                      type='checkbox'
                      checked={emailConsent}
                      onChange={e => setEmailConsent(e.target.checked)}
                      style={{
                        width: 'clamp(16px, 2dvh, 22px)',
                        height: 'clamp(16px, 2dvh, 22px)',
                        marginTop: '2px',
                        accentColor: 'var(--theme-btn)',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    />
                    I would like to sign up for email updates from&nbsp;
                    <strong>Stakemates</strong> and <strong>SigiLife</strong>
                  </label>

                  {emailConsent && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                      <input
                        className='textinput'
                        type='email'
                        placeholder='your@email.com'
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                        style={{
                          width: '100%',
                          color: 'black',
                          fontSize: 'clamp(14px, 2dvh, 20px)',
                        }}
                      />
                      <button
                        className='glassbutton'
                        onClick={handleEmailSubmit}
                        disabled={submitting || !emailInput.trim()}
                        style={{ fontSize: 'clamp(13px, 1.8dvh, 20px)' }}
                      >
                        {submitting ? 'Submitting…' : 'Submit'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p style={{
                  fontFamily: "'Pompiere', system-ui",
                  fontSize: 'clamp(15px, 2.2dvh, 26px)',
                  color: 'var(--theme-text)',
                  margin: 0,
                }}>
                  ✨ You're on the list!
                </p>
              )}

              <hr style={{
                width: '80%',
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                margin: 0,
              }} />

              {/* ── Create profile section ── */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(10px, 1.5dvh, 18px)',
                width: '100%',
              }}>
                <p style={{
                  fontFamily: "'Pompiere', system-ui",
                  fontSize: 'clamp(15px, 2.2dvh, 26px)',
                  color: 'var(--theme-text)',
                  margin: 0,
                  opacity: 0.85,
                }}>
                  Ready to create your profile?
                </p>

                {/* GoogleAuth handles its own navigation to /create-profile */}
                <GoogleAuth />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}