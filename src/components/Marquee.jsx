import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items1 = ['JavaScript', 'Node.js', 'Next.js', 'React', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'System Architecture', 'AWS', 'Docker']
const items2 = ['SaaS Platforms', 'RBAC Systems', 'API Design', 'MVC Architecture', 'TypeScript', 'CI/CD', 'WebSockets', 'OAuth', 'Clean Code', 'Microservices', 'Redis']

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
      gsap.to([t1, t2], { timeScale: 0.1, duration: 0.5 })
    }
    
    const handleMouseLeave = () => {
      gsap.to([t1, t2], { timeScale: 1, duration: 0.5 })
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
    <div ref={containerRef} className="relative w-full h-[250px] md:h-[350px] overflow-hidden flex items-center justify-center my-12">
      
      {/* Central Hacking Laptop Graphic */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex flex-col items-center justify-center opacity-70 transition-transform duration-700 hover:scale-105">
          {/* Laptop Screen */}
          <div className="relative w-[240px] md:w-[360px] h-[150px] md:h-[220px] bg-[#020a02] border-2 border-[#00ff00]/40 rounded-t-xl shadow-[0_0_60px_rgba(0,255,0,0.15)] overflow-hidden flex flex-col">
             {/* Browser/Terminal Header */}
             <div className="h-6 bg-[#00ff00]/10 flex items-center px-4 space-x-2 border-b border-[#00ff00]/20">
               <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00]/50"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00]/50"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-[#00ff00]/50"></div>
             </div>
             {/* Code Content */}
             <div className="p-5 flex-1 font-mono text-xs md:text-sm text-[#00ff00] leading-relaxed relative">
               <div className="animate-pulse opacity-90">
                  <p>{`> system.init()`}</p>
                  <p>{`> accessing_mainframe...`}</p>
                  <p className="mt-2 text-[#00ff00]/70">{`> bypass_security (true)`}</p>
                  <p>{`> downloading_skills...`}</p>
                  <p className="mt-2 font-bold">{`[OK] FULL_STACK_DEV`}</p>
                  <p className="font-bold">{`[OK] DEPLOYMENT_READY`}</p>
                  <span className="inline-block w-2.5 h-4 md:h-5 bg-[#00ff00] mt-1 animate-ping"></span>
               </div>
               {/* Scanlines */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none"></div>
             </div>
          </div>
          {/* Laptop Keyboard / Base */}
          <div className="w-[280px] md:w-[400px] h-[12px] md:h-[16px] bg-[#051105] border border-[#00ff00]/30 rounded-b-xl rounded-t-sm shadow-[0_10px_50px_rgba(0,255,0,0.25)] flex justify-center pt-1.5 z-10">
            <div className="w-[70px] md:w-[100px] h-[3px] bg-[#00ff00]/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Marquee Ribbon 1 (Diagonal Bottom-Left to Top-Right) */}
      <div className="absolute left-1/2 top-1/2 w-[150vw] md:w-[110vw] bg-darker/95 border-y border-[#00ff00]/20 shadow-[0_0_30px_rgba(0,0,0,0.9)] z-10 py-2.5 md:py-3 backdrop-blur-md"
           style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}>
        <div ref={row1Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
          {[...items1, ...items1].map((item, i) => (
            <span key={i} className="flex items-center mx-6 text-xl md:text-2xl font-bold text-white/80 hover:text-white transition-colors duration-300 whitespace-nowrap uppercase tracking-wider" style={{ fontFamily: 'Space Grotesk' }}>
              {item} <span className="text-[#00ff00] mx-6 text-sm">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Ribbon 2 (Diagonal Top-Left to Bottom-Right) */}
      <div className="absolute left-1/2 top-1/2 w-[150vw] md:w-[110vw] bg-darker/95 border-y border-[#00ff00]/20 shadow-[0_0_30px_rgba(0,0,0,0.9)] z-20 py-2.5 md:py-3 backdrop-blur-md"
           style={{ transform: 'translate(-50%, -50%) rotate(7deg)' }}>
        <div ref={row2Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
          {[...items2, ...items2].map((item, i) => (
            <span key={i} className="flex items-center mx-6 text-xl md:text-2xl font-bold text-white/50 hover:text-[#00ff00] transition-colors duration-300 whitespace-nowrap uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono' }}>
              {item} <span className="text-[#00ff00]/60 mx-6 text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Lighting / Vignette Effects to blend edges */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)]"></div>
    </div>
  )
}

export default Marquee
