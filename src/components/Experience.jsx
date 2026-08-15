import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  { year: '2026 — Present', role: 'Backend Engineering Focus', place: 'Self-Directed Learning & Projects', desc: 'Building production-grade SaaS applications, web IDEs, and full-stack systems using Node.js, Next.js, Prisma and PostgreSQL.' },
  { year: '2025 — 2026', role: 'Full Stack Project Development', place: 'Personal Projects', desc: 'Developed Team Task Manager (MERN + RBAC), NexIDE (web-based IDE), and multiple React applications.' },
  { year: '2024 — 2025', role: 'Programming Foundations', place: 'HackerRank & Competitive Coding', desc: 'Mastered C++, Java fundamentals and problem solving through competitive programming and algorithmic challenges.' },
  { year: '2024 — Present', role: 'CSE Undergraduate', place: 'CBIT Hyderabad', desc: 'Pursuing B.Tech in Computer Science & Engineering with focus on algorithms, data structures, and backend systems.' },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      
      const line = timelineRef.current?.querySelector('.timeline-line-fill')
      if (line) {
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top center', scrollTrigger: { trigger: timelineRef.current, start: 'top 70%', end: 'bottom 50%', scrub: 1 } })
      }
      
      timelineRef.current?.querySelectorAll('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item, { x: i % 2 === 0 ? -40 : 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-16 flex flex-col items-center text-center">
          <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ fontFamily: 'JetBrains Mono' }}>04 // JOURNEY</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            My<br /><span className="gradient-text pb-1 inline-block">Journey</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2">
            <div className="timeline-line-fill w-full h-full bg-gradient-to-b from-[#00f0ff]/60 via-[#a855f7]/60 to-[#ec4899]/60" />
          </div>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item relative grid grid-cols-1 md:grid-cols-2 items-center gap-y-4 md:gap-x-16 lg:gap-x-20">
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 rounded-full bg-[#00f0ff]/80 shadow-[0_0_10px_rgba(0,240,255,0.3)] z-10 ring-2 ring-[#0a0a0a]" />
                
                <div className={`ml-12 md:ml-0 ${i % 2 === 0 ? 'md:text-right' : 'md:order-2'}`}>
                  <span className="text-[#00f0ff]/50 text-xs font-medium tracking-wider block mb-2" style={{ fontFamily: 'JetBrains Mono' }}>{exp.year}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white/90" style={{ fontFamily: 'Space Grotesk' }}>{exp.role}</h3>
                  <h4 className="text-[#a855f7]/60 text-sm font-medium mt-1" style={{ fontFamily: 'JetBrains Mono' }}>{exp.place}</h4>
                  <p className="text-white/40 mt-3 leading-relaxed text-sm md:text-base font-light" style={{ fontFamily: 'Inter, sans-serif' }}>{exp.desc}</p>
                </div>
                
                <div className={`hidden md:block ${i % 2 === 0 ? '' : 'md:order-1'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Experience