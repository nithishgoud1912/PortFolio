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
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      gsap.fromTo(contentRef.current?.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-[#00f0ff]/[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div ref={headingRef} className="mb-10">
          <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium mb-4 block" style={{ fontFamily: 'JetBrains Mono' }}>05 // CONTACT</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold mt-4" style={{ fontFamily: 'Space Grotesk' }}>
            Let's Build<br /><span className="gradient-text pb-1 inline-block">Something Great</span>
          </h2>
        </div>

        <div ref={contentRef}>
          <p className="text-lg text-white/35 max-w-xl mx-auto mb-8 leading-relaxed font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
            Open to <span className="text-[#00f0ff]/70">backend engineering discussions</span> and <span className="text-[#a855f7]/70">internship opportunities</span>. Let's start a conversation.
          </p>

          <a
            href="mailto:nanigoud191206@gmail.com"
            className="inline-block text-xl md:text-3xl lg:text-4xl font-bold gradient-text hover:scale-[1.02] transition-transform duration-300 mb-10 break-all sm:break-normal relative group"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            nanigoud191206@gmail.com
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] transition-all duration-500" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: <FiGithub size={18} />, href: 'https://github.com/nithishgoud1912', label: 'GitHub' },
              { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/', label: 'LinkedIn' },
              { icon: <FiMail size={18} />, href: 'mailto:nanigoud191206@gmail.com', label: 'Email' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300">
                <span className="text-white/40 group-hover:text-[#00f0ff] transition-colors">{s.icon}</span>
                <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors font-medium" style={{ fontFamily: 'JetBrains Mono' }}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contact