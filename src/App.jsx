import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageMotion from './components/PageMotion'
import QuickNav from './components/QuickNav'
import { useSmoothScroll } from './components/SmoothScroll'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import { blogArticles } from './data/articles'

export default function App() {
  const location = useLocation()
  const scrollTo = useSmoothScroll()
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light' } catch { return 'light' }
  })
  const [quickOpen, setQuickOpen] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101116' : '#f5f3ef')
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* Theme still works without storage. */ }
  }, [theme])
  useEffect(() => {
    const onKey = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        if (document.querySelector('.project-dialog[open]')) return
        event.preventDefault()
        setQuickOpen(open => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget')
    if (location.pathname === '/' && scrollTarget) {
      sessionStorage.removeItem('scrollTarget')
      scrollTo(scrollTarget)
    } else {
      scrollTo(0, { immediate: true })
    }
    const article = blogArticles.find(item => location.pathname === `/blog/${item.slug}`)
    const title = article?.title || (location.pathname.startsWith('/blog') ? 'Writing' : 'AI Engineer & Backend Developer')
    document.title = `${title} · Nithish Kumar Goud`
  }, [location.pathname, scrollTo])

  // Keep section jumps separate from the hash router used by GitHub Pages.
  function handleSectionLink(event) {
    const anchor = event.target.closest('a')
    const href = anchor?.getAttribute('href')
    if (!href?.startsWith('#') || href.startsWith('#/')) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    scrollTo(target, { immediate: href === '#main-content' && anchor.classList.contains('skip-link') })
    if (href === '#main-content') target.focus({ preventScroll: true })
  }

  return (
    <div onClick={handleSectionLink}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} onSearch={() => setQuickOpen(true)} />
      <QuickNav open={quickOpen} onClose={() => setQuickOpen(false)} />
      <PageMotion />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<section className="page-section"><h1>Page not found.</h1><Link to="/">Return to portfolio ↗</Link></section>} />
        </Routes>
      </main>
      <footer className="site-footer"><Link to="/" className="footer-signature">Nithish<span>®</span></Link><div><span>© {new Date().getFullYear()} L. Nithish Kumar Goud</span><span>Made with curiosity. Based in Hyderabad.</span></div><a href="#main-content">Back to top ↑</a></footer>
    </div>
  )
}
