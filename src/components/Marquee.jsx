import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items1 = ['JavaScript', 'Node.js', 'Next.js', 'React', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'System Architecture', 'Docker']
const items2 = ['SaaS Platforms', 'RBAC Systems', 'API Design', 'MVC Architecture', 'TypeScript', 'CI/CD', 'WebSockets', 'OAuth', 'Clean Code', 'Microservices']

const Marquee = () => {
  const containerRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const t1 = gsap.to(row1Ref.current, {
      xPercent: -50,
      ease: 'none',
      duration: 35,
      repeat: -1
    })
    
    const t2 = gsap.fromTo(row2Ref.current, { xPercent: -50 }, {
      xPercent: 0,
      ease: 'none',
      duration: 40,
      repeat: -1
    })

    const handleMouseEnter = () => {
      gsap.to([t1, t2], { timeScale: 0.15, duration: 0.6 })
    }
    
    const handleMouseLeave = () => {
      gsap.to([t1, t2], { timeScale: 1, duration: 0.6 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
        t1.kill()
        t2.kill()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full py-10 md:py-14 overflow-hidden my-4">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      
      {/* Row 1 */}
      <div className="mb-4">
        <div ref={row1Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
          {[...items1, ...items1].map((item, i) => (
            <span key={i} className="flex items-center mx-5 md:mx-8 text-lg md:text-2xl font-semibold text-white/[0.12] hover:text-white/30 transition-colors duration-500 whitespace-nowrap uppercase tracking-wider select-none" style={{ fontFamily: 'Space Grotesk' }}>
              {item} <span className="text-[#00f0ff]/30 mx-5 md:mx-8 text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div>
        <div ref={row2Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
          {[...items2, ...items2].map((item, i) => (
            <span key={i} className="flex items-center mx-5 md:mx-8 text-lg md:text-2xl font-semibold text-white/[0.08] hover:text-white/20 transition-colors duration-500 whitespace-nowrap uppercase tracking-wider select-none" style={{ fontFamily: 'JetBrains Mono' }}>
              {item} <span className="text-[#a855f7]/20 mx-5 md:mx-8 text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Side fades for blending */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
    </div>
  )
}

export default Marquee
