import { useEffect, useRef } from 'react'

const ScrollProgress = () => {
  const barRef = useRef(null)

  useEffect(() => {
    let rafId
    let prevWidth = -1
    const update = () => {
      const scrollTop = document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (barRef.current && Math.abs(width - prevWidth) > 0.05) {
        barRef.current.style.width = `${width}%`
        prevWidth = width
      }
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9999] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899]"
        style={{ width: '0%' }}
      />
    </div>
  )
}

export default ScrollProgress
