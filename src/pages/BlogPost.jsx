import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogArticles } from '../data/articles'
export default function BlogPost() {
  const { slug } = useParams()
  const article = blogArticles.find(a => a.slug === slug)
  const [copyStatus, setCopyStatus] = useState('Copy link')
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopyStatus('Link copied') }
    catch { setCopyStatus('Could not copy. Copy the address from your browser.') }
  }
  if (!article) return <section className="page-section"><h1>Article not found.</h1><Link to="/blog">← All writing</Link></section>
  return <section className="page-section article-page"><Link className="text-link" to="/blog">← All writing</Link><header className="article-header"><span className="eyebrow">{article.category} · {article.readTime}</span><h1>{article.title}</h1><div className="article-byline"><span>L. Nithish Kumar Goud · {article.date}</span><button onClick={copyLink} className="text-link">{copyStatus === 'Link copied' ? 'Copied ✓' : 'Copy link ↗'}</button><span className="sr-only" role="status">{copyStatus}</span></div></header><article className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} /><div className="article-end"><Link to="/blog">← All writing</Link><a href="#main-content">Back to top ↑</a></div></section>
}
