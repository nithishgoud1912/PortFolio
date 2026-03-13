import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const roles = ['Backend Engineer', 'SaaS Builder', 'API Architect', 'Full-Stack Dev', 'Problem Solver']

const floatingSnippets = [
  { code: 'const api = express()', x: '7%', y: '22%', delay: 0, color: '#00f0ff' },
  { code: 'SELECT * FROM users', x: '78%', y: '20%', delay: 0.6, color: '#a855f7' },
  { code: 'git push origin main', x: '10%', y: '68%', delay: 1.1, color: '#ec4899' },
  { code: 'npm run build', x: '74%', y: '72%', delay: 1.6, color: '#00f0ff' },
  { code: '{ status: 200 }', x: '86%', y: '46%', delay: 0.9, color: '#a855f7' },
  { code: 'async/await', x: '3%', y: '47%', delay: 1.4, color: '#ec4899' },
  { code: 'jwt.verify(token)', x: '65%', y: '88%', delay: 0.3, color: '#00f0ff' },
  { code: 'prisma.user.create()', x: '20%', y: '88%', delay: 0.7, color: '#a855f7' },
]

const Hero = () => {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const tagRef = useRef(null)
  const snippetsRef = useRef([])

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex(prev => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        )
      }, isDeleting ? 55 : 110)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(tagRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo(headingRef.current.children, { y: 120, opacity: 0, rotationX: -80 }, { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')

    // Add continuous dynamic floating animation to snippets
    snippetsRef.current.forEach((el) => {
      if (!el) return
      
      const animateSnippet = () => {
        gsap.to(el, {
          x: gsap.utils.random(-80, 80),
          y: gsap.utils.random(-80, 80),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(4, 9),
          ease: 'sine.inOut',
          onComplete: animateSnippet,
        })
      }
      // Delay start randomly
      setTimeout(animateSnippet, gsap.utils.random(0, 1000))
    })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      <div className="absolute inset-0 bg-linear-to-b from-[#050505]/50 via-transparent to-[#0a0a0a] z-[1]" />
      
      <div className="absolute top-1/2 left-1/4 -translate-1/2 w-[30vw] h-[30vh] bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 right-1/4 -translate-1/2 w-[30vw] h-[30vh] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#0a0a0a] z-[1]" />

      {/* Floating code snippets */}
      {floatingSnippets.map((s, i) => (
        <div
          key={i}
          ref={(el) => snippetsRef.current[i] = el}
          className="absolute z-[2] hidden lg:block pointer-events-none select-none"
          style={{
            left: s.x, top: s.y,
            opacity: 0.20,
          }}
        >
          <code
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: s.color,
              background: 'rgba(10,10,10,0.7)',
              border: `1px solid ${s.color}25`,
              padding: '4px 10px',
              borderRadius: '6px',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
            }}
          >
            {s.code}
          </code>
        </div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-6xl w-full">
        <div ref={tagRef} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-white/80" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Available for Internships</span>
        </div>
        
        <div ref={headingRef} className="overflow-visible pb-4">
          <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-bold leading-[1.05] tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="block text-white/90 mb-3 text-3xl md:text-4xl lg:text-5xl font-medium">Hi, I'm</span>
            <span className="block gradient-text pb-2 px-2 -ml-2 drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">Nithish Kumar</span>
            <span className="block text-white/60 text-xl md:text-3xl lg:text-4xl mt-5 font-light min-h-[1.4em]">
              <span className="text-[#00f0ff] font-medium drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">{displayText}</span>
              <span className="inline-block w-[2px] h-[0.85em] bg-[#00f0ff] ml-0.5 align-middle motion-safe:animate-pulse" />
            </span>
          </h1>
        </div>
        
        <p ref={subRef} className="mt-6 text-base md:text-lg text-white/60 mx-auto font-light leading-relaxed max-w-2xl drop-shadow-sm">
          Crafting secure & scalable systems using <span className="text-[#a855f7] font-medium drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Node.js</span>, <span className="text-[#ec4899] font-medium drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">Next.js</span>, and modern architectures. <br className="hidden md:block" />2nd Year CSE Undergrad at <span className="text-[#00f0ff] font-medium drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">CBIT Hyderabad</span>.
        </p>
        
        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="group relative px-8 py-4 rounded-full overflow-hidden w-full sm:w-auto shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-500 hover:scale-105 active:scale-95">
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-white font-bold tracking-wide text-lg" style={{ fontFamily: 'Space Grotesk' }}>Explore My Work <span className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
          </button>
          
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full border border-white/10 hover:border-[#00f0ff]/50 bg-white/5 hover:bg-[#00f0ff]/10 text-white hover:text-[#00f0ff] transition-all duration-300 w-full sm:w-auto text-lg backdrop-blur-md hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]" style={{ fontFamily: 'Space Grotesk' }}>
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  )
}
export default Hero
