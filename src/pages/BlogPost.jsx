import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCopy, FiCheck, FiArrowUp } from 'react-icons/fi'
import { blogArticles } from '../data/articles'

export default function BlogPost() {
  const { slug } = useParams()
  const article = blogArticles.find(item => item.slug === slug)
  const [copyStatus, setCopyStatus] = useState('')
  const parsed = useMemo(() => {
    if (!article) return { html: '', headings: [] }
    const document = new DOMParser().parseFromString(article.content, 'text/html')
    const headings = [...document.querySelectorAll('h2')].map((heading, index) => {
      heading.id = `article-section-${index + 1}`
      return { title: heading.textContent, id: heading.id }
    })
    return { html: document.body.innerHTML, headings }
  }, [article])
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopyStatus('Link copied') }
    catch { setCopyStatus('Copy the address from your browser.') }
  }
  if (!article) return <section className="page-section"><h1>Article not found.</h1><Link className="text-link" to="/blog">← All writing</Link></section>
  return <section className="page-section reader-page"><Link className="text-link" to="/blog"><FiArrowLeft /> Back to the journal</Link><header className="reader-header"><span className="section-label">{article.category.toUpperCase()} / {article.readTime.toUpperCase()}</span><h1>{article.title}</h1><p className="reader-deck">{article.excerpt}</p><div className="reader-byline"><img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="" /><div><strong>Nithish Kumar Goud</strong><span>{article.date}</span></div><button className="copy-button" onClick={copyLink}>{copyStatus === 'Link copied' ? <FiCheck /> : <FiCopy />}{copyStatus === 'Link copied' ? 'Link copied' : 'Copy link'}</button><span className="sr-only" role="status">{copyStatus}</span></div></header>
    <div className="reader-grid"><aside className="article-toc"><span className="mono">IN THIS NOTE</span><nav aria-label="Article contents">{parsed.headings.map(({ title, id }, index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{title}</a>)}</nav><Link to="/blog" className="text-link"><FiArrowLeft /> All notes</Link></aside><article className="article-body" dangerouslySetInnerHTML={{ __html: parsed.html }} /></div><div className="article-end"><Link to="/blog">← Back to the journal</Link><a href="#main-content">Back to top <FiArrowUp /></a></div>
  </section>
}
