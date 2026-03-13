import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

const Navbar = () => {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 })
  }, [])

  useEffect(() => {
    if (!menuRef.current) return
    gsap.to(menuRef.current, {
      clipPath: isOpen ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
      duration: isOpen ? 0.8 : 0.6, ease: 'power3.inOut',
    })
  }, [isOpen])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 w-full z-50 px-6 md:px-12 py-6">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between max-w-6xl mx-auto">
          <a href="#" className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NK<span className="text-[#00f0ff]">.</span></a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-sm text-white/60 hover:text-[#00f0ff] transition-colors duration-300 tracking-wider uppercase relative group" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="text-[#00f0ff]/60 mr-2">0{i + 1}.</span>{link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f0ff] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5">
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>
      <div ref={menuRef} className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center md:hidden" style={{ clipPath: 'circle(0% at 95% 5%)' }}>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button key={link} onClick={() => scrollTo(link)} className="text-3xl font-bold text-white hover:text-[#00f0ff] transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-[#00f0ff]/40 text-lg mr-3" style={{ fontFamily: 'JetBrains Mono' }}>0{i + 1}</span>{link}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
export default Navbar