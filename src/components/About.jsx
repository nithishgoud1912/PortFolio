import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const terminalLines = [
  { type: 'prompt', text: 'cat nithish.json' },
  { type: 'output', text: '{', color: 'text-white/40' },
  { type: 'key-value', key: '  "name"', value: '"L. Nithish Kumar Goud"' },
  { type: 'key-value', key: '  "role"', value: '"Backend Engineer"' },
  { type: 'key-value', key: '  "university"', value: '"CBIT Hyderabad"' },
  { type: 'key-value', key: '  "year"', value: '3rd' },
  { type: 'key-value', key: '  "stack"', value: '["Node.js", "Next.js", "Prisma"]' },
  { type: 'key-value', key: '  "focus"', value: '"SaaS & REST APIs"' },
  { type: 'key-value', key: '  "available"', value: 'true', last: true },
  { type: 'output', text: '}', color: 'text-white/40' },
  { type: 'cursor' },
]

const getValueColorClass = (value) => {
  if (typeof value === 'string' && value.startsWith('"')) return 'text-[#ec4899]/80'
  if (value === 'true' || value === 'false') return 'text-[#00f0ff]'
  return 'text-[#f59e0b]'
}

const TerminalWindow = () => (
  <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-sm w-full">
    <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.05]">
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]/80" />
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]/80" />
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]/80" />
      <span className="ml-3 text-[11px] text-white/20 tracking-wide" style={{ fontFamily: 'JetBrains Mono' }}>~/nithish/profile.json</span>
    </div>
    <div className="p-5 md:p-7 space-y-1.5 text-[13px] md:text-sm" style={{ fontFamily: 'JetBrains Mono' }}>
      {terminalLines.map((line, i) => {
        if (line.type === 'prompt') return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[#00f0ff]/70 font-bold">›</span>
            <span className="text-[#00f0ff]/60">{line.text}</span>
          </div>
        )
        if (line.type === 'output') return (
          <div key={i} className={`pl-4 ${line.color}`}>{line.text}</div>
        )
        if (line.type === 'key-value') return (
          <div key={i} className="pl-4">
            <span className="text-[#a855f7]/80">{line.key}</span>
            <span className="text-white/25">: </span>
            <span className={getValueColorClass(line.value)}>{line.value}</span>
            {!line.last && <span className="text-white/20">,</span>}
          </div>
        )
        if (line.type === 'cursor') return (
          <div key={i} className="flex items-center gap-2 mt-2">
            <span className="text-[#00f0ff]/70 font-bold">›</span>
            <span className="inline-block w-2 h-4 bg-[#00f0ff]/60 animate-pulse rounded-[1px]" />
          </div>
        )
        return null
      })}
    </div>
  </div>
)

const About = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRefs = useRef([])
  const statsRef = useRef(null)
  const terminalRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      
      if (photoRef.current) {
        gsap.fromTo(photoRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: photoRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      }

      textRefs.current.forEach((ref) => {
        if (!ref) return
        gsap.fromTo(ref.querySelectorAll('.word'), { opacity: 0.08 }, { opacity: 1, duration: 0.5, stagger: 0.04, scrollTrigger: { trigger: ref, start: 'top 85%', end: 'bottom 60%', scrub: 1 } })
      })
      
      if (terminalRef.current) {
        gsap.fromTo(terminalRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: terminalRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      }
      
      statsRef.current?.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseInt(el.dataset.target)
        gsap.fromTo(el, { textContent: 0 }, { textContent: target, duration: 2, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const splitWords = (text) => text.split(' ').map((w, i) => (<span key={i} className="word inline-block">{w}&nbsp;</span>))

  const stats = [
    { number: 7, label: 'Projects Built', suffix: '+' },
    { number: 6, label: 'Technologies', suffix: '+' },
    { number: 2, label: 'Years Learning', suffix: '+' },
    { number: 100, label: 'Dedication', suffix: '%' },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="mb-16 flex flex-col items-center text-center">
          <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ fontFamily: 'JetBrains Mono' }}>01 // ABOUT</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            Who Am<br /><span className="gradient-text pb-1 inline-block">I?</span>
          </h2>
        </div>

        {/* Profile Photo + Bio Row */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start mb-16">
          {/* Profile Photo */}
          <div ref={photoRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glow behind photo */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#00f0ff]/20 via-[#a855f7]/15 to-[#ec4899]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Photo container */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500">
                <img
                  src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                  alt="Nithish Kumar Goud"
                  className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
              </div>
              {/* Decorative corner accents */}
              <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-[#00f0ff]/30 rounded-tl-lg" />
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-[#a855f7]/30 rounded-br-lg" />
            </div>
          </div>

          {/* Bio Text */}
          <div className="space-y-6 text-center lg:text-left">
            <p ref={el => textRefs.current[0] = el} className="text-lg md:text-xl text-white/50 leading-relaxed font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
              {splitWords("I'm L. Nithish Kumar Goud, a 3rd Year CSE undergrad at CBIT Hyderabad passionate about backend engineering. I build secure and scalable systems using JavaScript, Node.js and modern databases.")}
            </p>
            <p ref={el => textRefs.current[1] = el} className="text-lg md:text-xl text-white/50 leading-relaxed font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
              {splitWords("From inventory management SaaS platforms to full-stack task managers with RBAC, I focus on REST APIs, MVC architecture and clean code. I love turning complex problems into elegant solutions.")}
            </p>
          </div>
        </div>

        {/* Terminal */}
        <div ref={terminalRef} className="max-w-2xl mx-auto mb-16">
          <TerminalWindow />
        </div>
        
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="group rounded-2xl p-6 lg:p-8 text-center bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                <span className="stat-number" data-target={stat.number}>0</span>{stat.suffix}
              </div>
              <div className="text-[11px] text-white/30 tracking-[0.15em] uppercase font-medium group-hover:text-white/50 transition-colors duration-300" style={{ fontFamily: 'JetBrains Mono' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default About
