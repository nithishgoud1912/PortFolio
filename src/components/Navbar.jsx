import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMoon, FiSun, FiSearch, FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { useSmoothScroll } from './SmoothScroll'

const sections = ['projects', 'about', 'skills', 'experience', 'contact']
export default function Navbar({ theme, onTheme, onSearch }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const scrollTo = useSmoothScroll()

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus() }
    }
    function onPointer(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 761px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  useEffect(() => {
    if (location.pathname !== '/') { setActive(''); return }
    let frame = 0
    function update() {
      let current = ''
      for (const id of sections) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= 170) current = id
      }
      setActive(current)
    }
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [location.pathname])

  function goTo(id) {
    setOpen(false)
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', id)
      navigate('/')
    } else scrollTo(id)
  }
  return <header className="site-header" ref={headerRef}>
    <Link to="/" onClick={event => { if (location.pathname === '/') { event.preventDefault(); scrollTo(0) } }} className="wordmark" aria-label="Nithish Kumar home"><span className="brand-symbol">n<span>.</span></span><span>Nithish Goud</span></Link>
    <nav id="navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {sections.slice(0,3).map((id, index) => <button key={id} aria-current={active === id ? 'location' : undefined} onClick={() => goTo(id)}>{['Work', 'About', 'Toolkit'][index]}</button>)}
      <Link to="/blog" aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined}>Writing</Link>
      <button className="nav-contact" aria-current={active === 'contact' ? 'location' : undefined} onClick={() => goTo('contact')}>Let’s talk <FiArrowUpRight /></button>
    </nav>
    <div className="header-tools"><button className="quick-open" onClick={onSearch} aria-label="Open quick navigation"><FiSearch /><kbd>Ctrl K</kbd></button><button className="icon-button theme-toggle" onClick={onTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <FiSun /> : <FiMoon />}</button><button ref={menuRef} className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="navigation">{open ? <FiX /> : <FiMenu />}</button></div>
  </header>
}
