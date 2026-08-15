import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const roles = ['Backend Engineer', 'SaaS Builder', 'API Architect', 'Full-Stack Dev', 'Problem Solver']

const Hero = () => {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const tagRef = useRef(null)
  const scrollRef = useRef(null)

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
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

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(tagRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(headingRef.current.children,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.1'
    )
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Soft radial glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vh] bg-[#00f0ff]/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vh] bg-[#a855f7]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl w-full">
        {/* Availability Badge */}
        <div ref={tagRef} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wider text-white/50 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Available for Internships</span>
        </div>
        
        {/* Main Heading */}
        <div ref={headingRef} className="overflow-visible pb-2">
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="block text-white/50 text-xl md:text-2xl font-normal mb-3 tracking-wide">Hi, I'm</span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight gradient-text pb-1">Nithish Kumar</span>
            <span className="block text-white/40 text-lg md:text-2xl lg:text-3xl mt-5 font-light min-h-[1.4em]">
              <span className="text-[#00f0ff] font-medium">{displayText}</span>
              <span className="inline-block w-[2px] h-[0.8em] bg-[#00f0ff]/70 ml-0.5 align-middle animate-pulse" />
            </span>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p ref={subRef} className="mt-6 text-base md:text-lg text-white/40 mx-auto font-light leading-relaxed max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
          Crafting secure & scalable systems using{' '}
          <span className="text-[#a855f7]/80 font-medium">Node.js</span>,{' '}
          <span className="text-[#ec4899]/80 font-medium">Next.js</span>, and modern architectures.
          <br className="hidden md:block" />
          3rd Year CSE Undergrad at{' '}
          <span className="text-[#00f0ff]/80 font-medium">CBIT Hyderabad</span>.
        </p>
        
        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-7 py-3.5 rounded-full overflow-hidden w-full sm:w-auto transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-white font-semibold tracking-wide text-sm" style={{ fontFamily: 'Space Grotesk' }}>
              Explore My Work <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </button>

          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-full border border-white/[0.08] hover:border-[#00f0ff]/30 bg-white/[0.02] hover:bg-[#00f0ff]/[0.05] text-white/60 hover:text-[#00f0ff] transition-all duration-300 w-full sm:w-auto text-sm font-medium backdrop-blur-md hover:scale-[1.03] active:scale-95 text-center flex items-center justify-center cursor-pointer"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            View Resume
          </a>
          
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-full bg-white/[0.04] border border-transparent hover:border-white/10 hover:bg-white/[0.08] text-white/70 hover:text-white transition-all duration-300 w-full sm:w-auto text-sm font-medium hover:scale-[1.03] active:scale-95 cursor-pointer"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Let's Connect
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/20 uppercase tracking-[0.25em]" style={{ fontFamily: 'JetBrains Mono' }}>Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" style={{ animation: 'scroll-hint 2s ease-in-out infinite' }} />
      </div>
    </section>
  )
}
export default Hero
