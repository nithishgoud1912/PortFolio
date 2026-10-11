import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiArrowUpRight, FiX } from 'react-icons/fi'
import { useSmoothScroll } from './SmoothScroll'

const destinations = [
  ['Selected work', 'Browse my projects', 'projects'],
  ['About me', 'The person behind the code', 'about'],
  ['My toolkit', 'Languages, frameworks & tools', 'skills'],
  ['My journey', 'Experience & education', 'experience'],
  ['Writing', 'Engineering notes & ideas', '/blog'],
  ['Get in touch', 'Start a conversation', 'contact'],
]

export default function QuickNav({ open, onClose }) {
  const dialog = useRef(null)
  const search = useRef(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const scrollTo = useSmoothScroll()
  useEffect(() => {
    if (open) { setQuery(''); dialog.current.showModal(); search.current.focus() }
    else dialog.current.close()
  }, [open])
  function go(target) {
    dialog.current.close()
    onClose()
    if (target.startsWith('/')) navigate(target)
    else {
      sessionStorage.setItem('scrollTarget', target)
      navigate('/')
      const element = document.getElementById(target)
      if (element) {
        sessionStorage.removeItem('scrollTarget')
        scrollTo(element)
      }
    }
  }
  const results = destinations.filter(item => item.join(' ').toLowerCase().includes(query.toLowerCase()))
  return <dialog ref={dialog} className="quick-dialog" onClose={onClose} aria-labelledby="quick-title" onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="quick-body"><div className="dialog-top"><h2 id="quick-title">Where to?</h2><button className="icon-button" onClick={onClose} aria-label="Close quick navigation"><FiX /></button></div>
      <label className="search-field"><FiSearch /><input ref={search} value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a section…" aria-label="Search navigation" /></label>
      <div className="quick-results">{results.map(([title, description, target]) => <button key={target} onClick={() => go(target)}><span><strong>{title}</strong><small>{description}</small></span><FiArrowUpRight /></button>)}{!results.length && <p className="empty-results">No matching sections. Try “work” or “contact”.</p>}</div>
      <p className="quick-hint">Use Tab to navigate · Enter to select · Esc to close</p>
    </div>
  </dialog>
}
