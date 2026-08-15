import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import AmbientBackground from './components/AmbientBackground'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Scroll to top on every route/page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="noise-overlay">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <SmoothScroll>
          <AmbientBackground />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </div>
  )
}

export default App