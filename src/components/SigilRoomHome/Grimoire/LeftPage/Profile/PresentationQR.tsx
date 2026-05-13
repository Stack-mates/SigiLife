import { useRef, useEffect, useState } from 'react'
import Menu from '../../../../Parts/Menu'

export default function PresentationQR() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ width: 2160, height: 1260 })

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

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div
          className='qrpage art-page-base'
          style={{ width: `${dims.width}px`, height: `${dims.height}px` }}
        >
          <Menu />
        </div>
      </div>
    </div>
  )
}