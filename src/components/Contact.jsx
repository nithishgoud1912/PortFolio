import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
      gsap.fromTo(contentRef.current?.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-6 md:py-5 lg:py-6 px-3 md:px-6 lg:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#00f0ff]/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#a855f7]/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[200px] rounded-full bg-[#ec4899]/[0.03] blur-[80px] pointer-events-none" />

      {/* Decorative corner code labels */}
      <div className="absolute top-8 left-8 hidden lg:block pointer-events-none select-none opacity-20">
        <code className="text-[10px] text-[#00f0ff]" style={{ fontFamily: 'JetBrains Mono' }}>// say hello</code>
      </div>
      <div className="absolute bottom-8 right-8 hidden lg:block pointer-events-none select-none opacity-20">
        <code className="text-[10px] text-[#a855f7]" style={{ fontFamily: 'JetBrains Mono' }}>{"status: 'open'"}</code>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div ref={headingRef} className="mb-6">
          <span className="text-[#00f0ff] text-sm tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: 'JetBrains Mono' }}>05 // CONTACT</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold mt-2" style={{ fontFamily: 'Space Grotesk' }}>Let's Build<br /><span className="gradient-text inline-block">Something Great</span></h2>
        </div>
        <div ref={contentRef}>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-1 leading-relaxed">Open to <span className="text-[#00f0ff]">backend engineering discussions</span> and <span className="text-[#a855f7]">internship opportunities</span>. Let's start a conversation!</p>
          <a
            href="mailto:nanigoud191206@gmail.com"
            className="inline-block text-2xl md:text-4xl lg:text-5xl font-bold gradient-text hover:scale-105 transition-transform duration-300 mb-8 break-all sm:break-normal relative group"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            nanigoud191206@gmail.com
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] transition-all duration-500 rounded-full" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[
              { icon: <FiGithub size={24} />, href: 'https://github.com/nithishgoud1912', label: 'GitHub' },
              { icon: <FiLinkedin size={24} />, href: 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/', label: 'LinkedIn' },
              { icon: <FiMail size={24} />, href: 'mailto:nanigoud191206@gmail.com', label: 'Email' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 rounded-full glass hover:border-[#00f0ff]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]">
                <span className="text-white/60 group-hover:text-[#00f0ff] transition-colors">{s.icon}</span>
                <span className="text-sm text-white/60 group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: 'JetBrains Mono' }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contact