import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const preloaderRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const duration = 1800
    const start = Date.now()

    // Animate content in
    gsap.fromTo(contentRef.current?.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.1 }
    )

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setCount(Math.floor(eased * 100))

      if (progress >= 1) {
        clearInterval(interval)
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.out',
          onComplete,
        })
      }
    }, 16)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#00f0ff]/[0.05] blur-[120px]" />
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] transition-all duration-100 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <div
          className="text-xs tracking-[0.3em] uppercase mb-6 text-white/30 font-medium"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Loading Portfolio
        </div>
        <div className="relative flex items-baseline justify-center">
          <span
            className="text-[4rem] sm:text-[5rem] md:text-[7rem] font-bold gradient-text leading-none tabular-nums"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {String(count).padStart(3, '0')}
          </span>
          <span className="text-[#00f0ff]/60 text-lg sm:text-xl md:text-2xl font-light ml-1">%</span>
        </div>
        <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}

export default Preloader