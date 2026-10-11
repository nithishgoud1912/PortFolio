import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import { blogArticles } from './data/articles'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget')
    if (location.pathname === '/' && scrollTarget) {
      sessionStorage.removeItem('scrollTarget')
      document.getElementById(scrollTarget)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
    const article = blogArticles.find(item => location.pathname === `/blog/${item.slug}`)
    const title = article?.title || (location.pathname.startsWith('/blog') ? 'Writing' : 'AI Engineer & Backend Developer')
    document.title = `${title} · Nithish Kumar Goud`
  }, [location.pathname])

  // Keep section jumps separate from the hash router used by GitHub Pages.
  function handleSectionLink(event) {
    const anchor = event.target.closest('a')
    const href = anchor?.getAttribute('href')
    if (!href?.startsWith('#') || href.startsWith('#/')) return
    const target = document.getElementById(href.slice(1))
    if (!target) return
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
    if (href === '#main-content') target.focus({ preventScroll: true })
  }

  return (
    <div onClick={handleSectionLink}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<section className="page-section"><h1>Page not found.</h1><Link to="/">Return to portfolio ↗</Link></section>} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} L. Nithish Kumar Goud</span>
        <span>Built with intention. Hyderabad, India.</span>
        <a href="#main-content">Back to top ↑</a>
      </footer>
    </div>
  )
}
