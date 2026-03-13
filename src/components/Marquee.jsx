import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items = ['JavaScript', 'Node.js', 'Next.js', 'React', 'Express.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'C++', 'Python', 'Java', 'SQL', 'REST APIs', 'JWT', 'Docker']
const items2 = ['SaaS Platforms', 'RBAC Systems', 'API Design', 'MVC Architecture', 'TypeScript', 'CI/CD', 'WebSockets', 'OAuth', 'Clean Code', 'DevOps', 'Microservices', 'Redis', 'GraphQL', 'Agile', 'Performance']

const Marquee = () => {
  const containerRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const t1 = gsap.to(row1Ref.current, {
      xPercent: -50,
      ease: 'none',
      duration: 30,
      repeat: -1
    })
    
    const t2 = gsap.fromTo(row2Ref.current, { xPercent: -50 }, {
      xPercent: 0,
      ease: 'none',
      duration: 25,
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
    <div ref={containerRef} className="py-6 overflow-hidden border-y border-white/5 space-y-4">
      <div ref={row1Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-2xl md:text-4xl font-bold text-white/10 hover:text-white/30 transition-colors duration-500 whitespace-nowrap" style={{ fontFamily: 'Space Grotesk' }}>
            {item} <span className="text-[#00f0ff]/40 mx-4">✦</span>
          </span>
        ))}
      </div>
      <div ref={row2Ref} className="flex" style={{ width: 'max-content', willChange: 'transform' }}>
        {[...items2, ...items2].map((item, i) => (
          <span key={i} className="mx-8 text-xl md:text-3xl font-bold text-white/5 hover:text-[#a855f7]/40 transition-colors duration-500 whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono' }}>
            {item} <span className="text-[#a855f7]/30 mx-4">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
