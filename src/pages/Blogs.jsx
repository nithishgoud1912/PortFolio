import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiSearch, FiX, FiArrowLeft } from 'react-icons/fi'
import { blogArticles } from '../data/articles'
export { blogArticles } from '../data/articles'

export default function Blogs() {
  const [filter, setFilter] = useState('All notes')
  const [query, setQuery] = useState('')
  const categories = ['All notes', ...new Set(blogArticles.map(article => article.category))]
  const articles = blogArticles.filter(article => (filter === 'All notes' || article.category === filter) && `${article.title} ${article.excerpt}`.toLowerCase().includes(query.toLowerCase().trim()))
  return <section className="page-section journal-page"><Link className="text-link" to="/"><FiArrowLeft /> Back to portfolio</Link>
    <header className="journal-heading"><span className="section-label">FIELD NOTES / THE JOURNAL</span><h1>Thoughts behind<br /><em>the code.</em></h1><p>Decisions, discoveries, and things I learned while building.<br />A small collection of engineering notes.</p></header>
    <div className="work-toolbar"><div className="project-filters" role="group" aria-label="Filter articles">{categories.map(category => <button key={category} onClick={() => setFilter(category)} aria-pressed={category === filter} className={category === filter ? 'active' : ''}>{category}</button>)}</div><label className="search-field project-search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} aria-label="Search articles" placeholder="Search the journal" />{query && <button onClick={() => setQuery('')} aria-label="Clear article search"><FiX /></button>}</label></div>
    <div className="work-results"><span role="status">{articles.length} {articles.length === 1 ? 'note' : 'notes'}</span><span>FROM THE BUILD TO THE PAGE.</span></div>
    <div className="journal-list">{articles.map((article, index) => <Link className="journal-entry" key={article.id} to={`/blog/${article.slug}`} data-reveal><span className="journal-index">0{index + 1}</span><div className="journal-entry-copy"><span className="mono">{article.category}</span><h2>{article.title}</h2><p>{article.excerpt}</p><div className="journal-meta"><span>{article.date}</span><span>{article.readTime}</span></div></div><span className="round-arrow"><FiArrowUpRight /></span></Link>)}</div>
    {!articles.length && <div className="empty-work"><FiSearch /><h3>No notes found.</h3><p>Try another topic or reset your filters.</p><button className="button secondary" onClick={() => { setQuery(''); setFilter('All notes') }}>Reset search & filters</button></div>}
  </section>
}
