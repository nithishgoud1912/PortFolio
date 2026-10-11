import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const sections = ['projects', 'about', 'skills', 'experience', 'contact']
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

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
    } else document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <header className="site-header" ref={headerRef}>
    <Link to="/" onClick={event => { if (location.pathname === '/') { event.preventDefault(); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) } }} className="wordmark" aria-label="Nithish Kumar home"><span className="monogram">N.</span><span className="wordmark-name">Nithish Kumar Goud<span className="wordmark-role">AI Engineer & Backend Developer</span></span></Link>
    <button ref={menuRef} className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation">{open ? 'Close −' : 'Menu +'}</button>
    <nav id="navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {sections.slice(0,4).map(id => <button key={id} aria-current={active === id ? 'location' : undefined} onClick={() => goTo(id)}>{id[0].toUpperCase() + id.slice(1)}</button>)}
      <Link to="/blog" aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined}>Writing</Link>
      <button className="nav-contact" aria-current={active === 'contact' ? 'location' : undefined} onClick={() => goTo('contact')}>Let’s talk <span>↗</span></button>
    </nav>
  </header>
}
