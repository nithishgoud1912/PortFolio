import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { blogArticles } from './Blogs'
import { FiCopy, FiCheck, FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi'

const BlogPost = () => {
  const { slug } = useParams()
  const article = blogArticles.find(art => art.slug === slug)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Entrance animations
    if (contentRef.current) {
      gsap.fromTo('.blog-header-elements', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      )
      gsap.fromTo('.blog-rich-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [slug])

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Article Not Found</h1>
        <p className="text-white/40 mb-8" style={{ fontFamily: 'Inter' }}>The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all text-xs font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'JetBrains Mono' }}>
          Back to Blog
        </Link>
      </div>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={contentRef} className="relative min-h-screen pt-32 pb-24 px-6">
      {/* Article reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[9999]">
        <div 
          className="h-full bg-gradient-to-r from-[#00f0ff] via-[#a855f7] to-[#ec4899] transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link to="/blog" className="blog-header-elements inline-flex items-center gap-2 text-xs text-white/40 hover:text-[#00f0ff] tracking-widest uppercase transition-colors duration-300 mb-10 group" style={{ fontFamily: 'JetBrains Mono' }}>
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back To Blog
        </Link>

        {/* Article Meta */}
        <div className="blog-header-elements flex flex-wrap items-center gap-4 mb-6">
          <span className="text-[10px] text-[#00f0ff]/70 font-semibold tracking-widest uppercase bg-[#00f0ff]/5 border border-[#00f0ff]/15 px-2.5 py-1 rounded-md" style={{ fontFamily: 'JetBrains Mono' }}>
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-white/20" style={{ fontFamily: 'JetBrains Mono' }}>
            <FiCalendar size={12} />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/20" style={{ fontFamily: 'JetBrains Mono' }}>
            <FiClock size={12} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="blog-header-elements text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.15]" style={{ fontFamily: 'Space Grotesk' }}>
          {article.title}
        </h1>

        {/* Actions Bar */}
        <div className="blog-header-elements flex items-center justify-between border-y border-white/[0.05] py-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
              <img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Nithish" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white/70" style={{ fontFamily: 'Space Grotesk' }}>L. Nithish Kumar Goud</div>
              <div className="text-[9px] text-white/25 uppercase tracking-wider" style={{ fontFamily: 'JetBrains Mono' }}>Author</div>
            </div>
          </div>
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] text-[10px] font-medium tracking-wider uppercase text-white/50 hover:text-white transition-all cursor-pointer"
            style={{ fontFamily: 'JetBrains Mono' }}
          >
            {copied ? (
              <>
                <FiCheck className="text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Rich Content View */}
        <article 
          className="blog-rich-content text-white/60 leading-relaxed font-light text-base md:text-lg space-y-6 blog-article-styles"
          style={{ fontFamily: 'Inter' }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Footer Navigation */}
        <div className="border-t border-white/[0.05] mt-16 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/blog" className="text-xs text-[#00f0ff] hover:text-white transition-colors duration-300 font-semibold tracking-wider uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
            ← All Articles
          </Link>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-white/30 hover:text-white transition-colors duration-300 font-semibold tracking-wider uppercase cursor-pointer"
            style={{ fontFamily: 'JetBrains Mono' }}
          >
            Back To Top ↑
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
