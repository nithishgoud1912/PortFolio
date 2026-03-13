import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const terminalLines = [
  { type: 'prompt', text: 'cat nithish.json' },
  { type: 'output', text: '{', color: 'text-white/60' },
  { type: 'key-value', key: '  "name"', value: '"L. Nithish Kumar Goud"' },
  { type: 'key-value', key: '  "role"', value: '"Backend Engineer"' },
  { type: 'key-value', key: '  "university"', value: '"CBIT Hyderabad"' },
  { type: 'key-value', key: '  "year"', value: '2' },
  { type: 'key-value', key: '  "stack"', value: '["Node.js", "Next.js", "Prisma"]' },
  { type: 'key-value', key: '  "focus"', value: '"SaaS & REST APIs"' },
  { type: 'key-value', key: '  "available"', value: 'true', last: true },
  { type: 'output', text: '}', color: 'text-white/60' },
  { type: 'cursor' },
]

const getValueColorClass = (value) => {
  if (typeof value === 'string' && value.startsWith('"')) return 'text-[#ec4899]'
  if (value === 'true' || value === 'false') return 'text-[#00f0ff]'
  return 'text-[#f59e0b]'
}

const TerminalWindow = () => (
  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_0_40px_rgba(0,240,255,0.05)] w-full">
    <div className="flex items-center gap-2 px-5 py-4 bg-white/[0.04] border-b border-white/[0.06]">
      <span className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 text-xs md:text-sm text-white/30 tracking-wide" style={{ fontFamily: 'JetBrains Mono' }}>~/nithish/profile.json</span>
    </div>
    <div className="p-6 md:p-8 space-y-2 text-sm md:text-base" style={{ fontFamily: 'JetBrains Mono' }}>
      {terminalLines.map((line, i) => {
        if (line.type === 'prompt') return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[#00f0ff] font-bold">›</span>
            <span className="text-[#00f0ff]/80">{line.text}</span>
          </div>
        )
        if (line.type === 'output') return (
          <div key={i} className={`pl-4 ${line.color}`}>{line.text}</div>
        )
        if (line.type === 'key-value') return (
          <div key={i} className="pl-4">
            <span className="text-[#a855f7]">{line.key}</span>
            <span className="text-white/40">: </span>
            <span className={getValueColorClass(line.value)}>{line.value}</span>
            {!line.last && <span className="text-white/30">,</span>}
          </div>
        )
        if (line.type === 'cursor') return (
          <div key={i} className="flex items-center gap-2 mt-2">
            <span className="text-[#00f0ff] font-bold">›</span>
            <span className="inline-block w-2 h-4 md:w-[10px] md:h-[18px] bg-[#00f0ff] animate-pulse rounded-[1px]" />
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
      textRefs.current.forEach((ref) => {
        if (!ref) return
        gsap.fromTo(ref.querySelectorAll('.word'), { opacity: 0.1 }, { opacity: 1, duration: 0.5, stagger: 0.04, scrollTrigger: { trigger: ref, start: 'top 85%', end: 'bottom 60%', scrub: 1 } })
      })
      if (terminalRef.current) {
        gsap.fromTo(terminalRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: terminalRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
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
    <section ref={sectionRef} id="about" className="relative py-20 px-6 md:px-12 lg:px-12 overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 -left-32 w-[60vw] h-[60vh] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-32 w-[60vw] h-[60vh] bg-[#a855f7]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="mb-20 flex flex-col items-center text-center">
          <span className="text-[#00f0ff] text-sm tracking-[0.3em] uppercase font-semibold mb-2" style={{ fontFamily: 'JetBrains Mono' }}>01 // ABOUT</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl leading-[1.1] font-bold mt-4" style={{ fontFamily: 'Space Grotesk' }}>Who Am<br /><span className="gradient-text pb-2 inline-block drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">I?</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div className="space-y-8 text-center lg:text-left">
            <p ref={el => textRefs.current[0] = el} className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">{splitWords("I'm L. Nithish Kumar Goud, a 2nd Year CSE undergrad at CBIT Hyderabad passionate about backend engineering. I build secure and scalable systems using JavaScript, Node.js and modern databases.")}</p>
            <p ref={el => textRefs.current[1] = el} className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">{splitWords("From inventory management SaaS platforms to full-stack task managers with RBAC, I focus on REST APIs, MVC architecture and clean code. I love turning complex problems into elegant solutions.")}</p>
          </div>
          <div ref={terminalRef} className="lg:pl-8 drop-shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <TerminalWindow />
          </div>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="relative group overflow-hidden rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-white/0 hover:from-[#00f0ff]/50 hover:to-[#a855f7]/50 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/0 to-[#a855f7]/0 group-hover:from-[#00f0ff]/10 group-hover:to-[#a855f7]/10 transition-colors duration-500 rounded-3xl z-0" />
              <div className="relative z-10 h-full w-full bg-[#0a0a0a] rounded-3xl p-8 lg:p-10 text-center flex flex-col justify-center items-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{ fontFamily: 'Space Grotesk' }}>
                  <span className="stat-number" data-target={stat.number}>0</span>{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-white/40 tracking-[0.2em] uppercase font-medium group-hover:text-white/80 transition-colors duration-300" style={{ fontFamily: 'JetBrains Mono' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default About
