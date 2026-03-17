import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt } from 'react-icons/fa'
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiTypescript, SiJavascript, SiCplusplus, SiPrisma, SiExpress, SiClerk } from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    title: 'Languages',
    icon: '⚡',
    items: [
      { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
      { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
      { icon: FaPython, name: 'Python', color: '#3776AB' },
      { icon: FaJava, name: 'Java', color: '#ED8B00' },
      { icon: SiCplusplus, name: 'C++', color: '#00599C' },
    ],
  },
  {
    title: 'Frameworks & Runtime',
    icon: '🚀',
    items: [
      { icon: FaReact, name: 'React', color: '#61DAFB' },
      { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' },
      { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
      { icon: SiExpress, name: 'Express', color: '#ffffff' },
      { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4' },
      { icon: SiPrisma, name: 'Prisma', color: '#5A67D8' },
      { icon: SiClerk, name: 'Clerk', color: '#6C47FF' },
    ],
  },
  {
    title: 'Databases & DevOps',
    icon: '🗄️',
    items: [
      { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
      { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
      { icon: FaDocker, name: 'Docker', color: '#2496ED' },
      { icon: FaGitAlt, name: 'Git', color: '#F05032' },
    ],
  },
]

// Flatten all items for the orbit
const allTech = categories.flatMap(c => c.items)

const OrbitSphere = ({ tech, angle, radius, ringSpeed }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = tech.icon

  return (
    <div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        animation: `orbit ${ringSpeed}s linear infinite`,
        animationDelay: `${-(angle / 360) * ringSpeed}s`,
        width: 0, height: 0,
        pointerEvents: 'none',
      }}
    >
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          left: `${radius}px`,
          top: '-20px',
          animation: `orbit-reverse ${ringSpeed}s linear infinite`,
          animationDelay: `${-(angle / 360) * ringSpeed}s`,
          pointerEvents: 'auto',
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-500"
          style={{
            width: isHovered ? '48px' : '40px',
            height: isHovered ? '48px' : '40px',
            marginLeft: isHovered ? '-4px' : '0',
            marginTop: isHovered ? '-4px' : '0',
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, rgba(10,10,10,0.95) 60%, rgba(0,0,0,1) 100%)`,
            boxShadow: isHovered
              ? `0 0 15px ${tech.color}60, 0 0 30px ${tech.color}20, inset 0 0 10px rgba(255,255,255,0.06)`
              : `0 0 8px ${tech.color}20, inset 0 0 4px rgba(255,255,255,0.02)`,
            border: `1.5px solid ${isHovered ? tech.color + '90' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          <div className="absolute top-[3px] left-[5px] w-[12px] h-[6px] rounded-full opacity-20"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6), transparent)' }} />
          <Icon
            size={isHovered ? 20 : 16}
            style={{
              color: isHovered ? tech.color : 'rgba(255,255,255,0.5)',
              filter: isHovered ? `drop-shadow(0 0 8px ${tech.color}80)` : 'none',
              transition: 'all 0.4s ease',
            }}
          />
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-all duration-300"
          style={{
            bottom: isHovered ? '-22px' : '-16px',
            opacity: isHovered ? 1 : 0,
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            fontWeight: '600',
            color: tech.color,
            textShadow: `0 0 10px ${tech.color}80, 0 0 5px ${tech.color}`,
          }}
        >
          {tech.name}
        </div>
      </div>
    </div>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const leftRef = useRef(null)
  const orbitRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        })

      gsap.fromTo(leftRef.current.querySelectorAll('.skill-cat'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        })

      gsap.fromTo(orbitRef.current,
        { scale: 0.8, opacity: 0, rotate: -20 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])

  // Responsively scale rings
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const scale = isMobile ? 0.8 : 1

  const ring1 = allTech.slice(0, 5)
  const ring2 = allTech.slice(5, 11)
  const ring3 = allTech.slice(11)

  const rings = [
    { items: ring1, radius: 80 * scale, speed: 15 },
    { items: ring2, radius: 135 * scale, speed: 25 },
    { items: ring3, radius: 190 * scale, speed: 35 },
  ]

  return (
    <section ref={sectionRef} id="skills" className="relative py-20 px-6 md:px-12 lg:px-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-bl from-[#00f0ff]/5 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-gradient-to-tr from-[#a855f7]/5 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-16 flex flex-col items-center text-center">
          <span className="text-[#00f0ff] text-xs md:text-sm tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: 'JetBrains Mono' }}>03 // SKILLS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold mt-4" style={{ fontFamily: 'Space Grotesk' }}>Technical<br /><span className="gradient-text pb-2 inline-block">Arsenal</span></h2>
        </div>

        {/* Split Layout: Left List + Right Orbit */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-center">

          {/* LEFT: Tech Stack List */}
          <div ref={leftRef} className="space-y-6 md:space-y-8">
            {categories.map((cat, ci) => (
              <div key={ci} className="skill-cat glass p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h3 className="text-sm md:text-base tracking-[0.1em] text-white/50 mb-5 flex items-center gap-3 font-semibold uppercase" style={{ fontFamily: 'Space Grotesk' }}>
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{cat.icon}</span> 
                  {cat.title}
                </h3>
                
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {cat.items.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.04] bg-[#0a0a0a]/50 hover:border-white/20 hover:bg-[#0a0a0a] transition-all duration-300 cursor-default shadow-sm"
                      >
                        <Icon
                          size={16}
                          className="transition-all duration-300"
                          style={{ color: item.color, filter: 'saturate(0.5) opacity(0.8)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.filter = `saturate(1.2) opacity(1) drop-shadow(0 0 5px ${item.color}80)` }}
                          onMouseLeave={(e) => { e.currentTarget.style.filter = 'saturate(0.5) opacity(0.8)' }}
                        />
                        <span className="text-xs md:text-sm text-white/60 hover:text-white/95 transition-colors font-medium" style={{ fontFamily: 'JetBrains Mono' }}>
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Orbit Visualization */}
          <div ref={orbitRef} className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center pointer-events-none mt-10 lg:mt-0">

            {/* Ambient Glow behind orbits */}
            <div className="absolute w-[250px] h-[250px] rounded-full opacity-20 blur-[60px] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #00f0ff, #a855f7 40%, transparent 70%)' }} />

            {/* Center Core */}
            <div className="absolute z-20 flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full pointer-events-auto"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(0,240,255,0.1), rgba(5,5,5,0.98) 70%)',
                boxShadow: '0 0 30px rgba(0,240,255,0.15), 0 0 60px rgba(168,85,247,0.1), inset 0 0 20px rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,240,255,0.2)',
              }}
            >
              <span className="text-xl md:text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NK</span>
              <span className="text-[9px] md:text-[10px] text-white/40 tracking-[0.15em] uppercase font-bold mt-0.5" style={{ fontFamily: 'JetBrains Mono' }}>Stack</span>
            </div>

            {/* Orbit Rings */}
            {rings.map((ring, ri) => {
              const diameter = ring.radius * 2
              return (
                <div key={ri} className="absolute rounded-full pointer-events-none" style={{
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                  border: ri === 1 ? '1px dashed rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)',
                }}>
                  {/* Subtle inner glow for rings */}
                  <div className="absolute inset-0 rounded-full" style={{
                    boxShadow: `inset 0 0 ${10 + ri * 5}px rgba(${ri === 0 ? '0,240,255' : ri === 1 ? '168,85,247' : '236,72,153'},0.05)`,
                  }} />
                  {ring.items.map((tech, ti) => {
                    const angle = (360 / ring.items.length) * ti
                    return (
                      <OrbitSphere key={ti} tech={tech} angle={angle} radius={ring.radius} ringSpeed={ring.speed} />
                    )
                  })}
                </div>
              )
            })}

            {/* Floating Particles */}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse blur-[1px]" style={{ top: '15%', left: '20%' }} />
            <div className="absolute w-1 h-1 rounded-full bg-[#a855f7] animate-pulse blur-[1px]" style={{ top: '75%', left: '15%', animationDelay: '1.2s' }} />
            <div className="absolute w-2 h-2 rounded-full bg-[#ec4899] animate-pulse blur-[2px]" style={{ top: '25%', right: '15%', animationDelay: '0.8s' }} />
            <div className="absolute w-1 h-1 rounded-full bg-white animate-pulse" style={{ bottom: '20%', right: '25%', animationDelay: '2s' }} />
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills