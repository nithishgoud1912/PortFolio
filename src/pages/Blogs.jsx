import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { blogArticles } from '../data/articles'
export { blogArticles } from '../data/articles'
export default function Blogs() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(blogArticles.map(a => a.category))]
  const articles = blogArticles.filter(a => filter === 'All' || a.category === filter)
  return <section className="page-section blog-page"><Link className="text-link" to="/">← Back to portfolio</Link><div className="section-heading"><div><span className="eyebrow">FIELD NOTES / WRITING</span><h1>Ideas, explored.<br />Lessons, shared.</h1></div><p className="section-summary">Notes on AI automation, backend architecture, and the decisions behind my projects.</p></div><div className="project-filters" role="group" aria-label="Filter articles">{categories.map(cat => <button key={cat} onClick={() => setFilter(cat)} aria-pressed={cat === filter} className={cat === filter ? 'active' : ''}>{cat}</button>)}</div><div className="article-list">{articles.map(a => <Link className="article-card" to={`/blog/${a.slug}`} key={a.id}><span className="eyebrow">{a.category} · {a.readTime}</span><h2>{a.title}</h2><p>{a.excerpt}</p><div className="writing-meta"><span>{a.date}</span><span>Read article <FiArrowUpRight /></span></div></Link>)}</div></section>
}
