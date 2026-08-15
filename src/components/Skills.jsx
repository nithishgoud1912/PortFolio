import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaVuejs } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiTypescript, SiJavascript, SiCplusplus, SiPrisma, SiExpress, SiClerk, SiShadcnui, SiC } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: 'Languages',
    icon: '⚡',
    description: 'Core programming languages I work with daily',
    items: [
      { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
      { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
      { icon: FaPython, name: 'Python', color: '#3776AB' },
      { icon: FaJava, name: 'Java', color: '#ED8B00' },
      { icon: SiCplusplus, name: 'C++', color: '#00599C' },
      { icon: SiC, name: 'C', color: '#A8B9CC' }
    ],
  },
  {
    title: 'Frameworks & Runtime',
    icon: '🚀',
    description: 'Tools and frameworks for building scalable applications',
    items: [
      { icon: FaReact, name: 'React', color: '#61DAFB' },
      { icon: FaVuejs, name: 'Vue', color: '#4FC08D' },
      { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
      { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
      { icon: SiExpress, name: 'Express', color: '#ffffff' },
      { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
      { icon: SiShadcnui, name: 'Shadcn UI', color: '#ffffff' },
      { icon: SiPrisma, name: 'Prisma', color: '#5A67D8' },
      { icon: SiClerk, name: 'Clerk', color: '#6C47FF' },
    ],
  },
  {
    title: 'Databases & DevOps',
    icon: '🗄️',
    description: 'Data persistence, containerization, and version control',
    items: [
      { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
      { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
      { icon: FaDocker, name: 'Docker', color: '#2496ED' },
      { icon: FaGitAlt, name: 'Git', color: '#F05032' },
    ],
  },
]

const Skills = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        })

      gsap.fromTo(cardsRef.current?.querySelectorAll('.skill-cat'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16 flex flex-col items-center text-center">
          <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ fontFamily: 'JetBrains Mono' }}>03 // SKILLS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            Technical<br /><span className="gradient-text pb-1 inline-block">Arsenal</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((cat, ci) => (
            <div key={ci} className="skill-cat group rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden">
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/[0.02] to-[#a855f7]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="text-base font-semibold text-white/80 tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-white/25 mb-5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{cat.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className="group/item flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.04] bg-[#0a0a0a]/50 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                      >
                        <Icon
                          size={14}
                          className="transition-all duration-300 opacity-50 group-hover/item:opacity-100"
                          style={{ color: item.color }}
                        />
                        <span className="text-xs text-white/40 group-hover/item:text-white/80 transition-colors font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills