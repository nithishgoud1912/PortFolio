import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const navLinks = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

const Navbar = () => {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
  }, [])

  useEffect(() => {
    if (!menuRef.current) return
    gsap.to(menuRef.current, {
      clipPath: isOpen ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
      duration: isOpen ? 0.7 : 0.5, ease: 'power3.inOut',
    })
  }, [isOpen])

  const scrollTo = (id) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', id.toLowerCase())
      navigate('/')
    } else {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav ref={navRef} className="fixed top-0 w-full z-50 px-4 md:px-8 py-4">
        <div className="rounded-full px-5 py-2.5 flex items-center justify-between max-w-5xl mx-auto bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/[0.06]">
          <Link to="/" className="text-xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NK<span className="text-[#00f0ff]">.</span></Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-[11px] text-white/40 hover:text-white/80 transition-colors duration-300 tracking-wider uppercase relative group cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="text-[#00f0ff]/40 mr-1.5">0{i + 1}.</span>{link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f0ff]/50 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Link to="/blog" className="text-[11px] text-white/40 hover:text-[#00f0ff] transition-colors duration-300 tracking-wider uppercase relative group cursor-pointer" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <span className="text-[#00f0ff]/40 mr-1.5">06.</span>Blogs
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f0ff]/50 group-hover:w-full transition-all duration-300" />
            </Link>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#00f0ff] hover:text-white border border-[#00f0ff]/30 hover:border-white px-3.5 py-1.5 rounded-full transition-all duration-300 tracking-wider uppercase cursor-pointer"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Resume ↗
            </a>
          </div>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative z-[60] w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer">
            <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[1.5px] bg-white/60 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div ref={menuRef} className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl flex items-center justify-center md:hidden" style={{ clipPath: 'circle(0% at 95% 5%)' }}>
        <div className="flex flex-col items-center gap-7">
          {navLinks.map((link, i) => (
            <button key={link} onClick={() => scrollTo(link)} className="text-2xl font-semibold text-white/70 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="text-[#00f0ff]/30 text-sm mr-2" style={{ fontFamily: 'JetBrains Mono' }}>0{i + 1}</span>{link}
            </button>
          ))}
          <Link to="/blog" onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-white/70 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="text-[#00f0ff]/30 text-sm mr-2" style={{ fontFamily: 'JetBrains Mono' }}>06</span>Blogs
          </Link>
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-[#00f0ff] hover:text-white transition-colors mt-2"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </>
  )
}
export default Navbar