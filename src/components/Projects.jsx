import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiArrowUpRight, FiGithub, FiX, FiCode, FiLayers, FiTerminal, FiCheck } from 'react-icons/fi'
import { projects } from '../data/projects'

const order = [projects[1], projects[0], projects[2], projects[3], ...projects.slice(4)]
const category = project => project.title === 'ReviewPilot' ? 'AI & automation' : ['SwiftStock', 'Team Task Manager', 'NexIDE'].includes(project.title) ? 'Full stack' : 'Web apps'
const filters = ['All work', 'AI & automation', 'Full stack', 'Web apps']
const features = {
  ReviewPilot: ['GitHub webhooks bring code changes into the workflow.', 'Groq and Llama 3.3 generate code review feedback.', 'Regex scanning checks for exposed secrets.', 'Review results are delivered as HTML email reports.'],
  SwiftStock: ['Stock tracking for small and medium businesses.', 'Inventory analytics and role-based dashboards.', 'PostgreSQL data access with Prisma.', 'Authentication through Clerk.'],
  'Team Task Manager': ['Admin-led project creation and task assignment.', 'Role-based access controls.', 'JWT authentication.', 'Automated email notifications.'],
  NexIDE: ['Monaco-powered editing in the browser.', 'Browser-based code execution.', 'OAuth integration.', 'Launchable through an npx command.'],
  'Password Generator': ['Customizable password generation.', 'Randomized output.', 'A React interface built with Vite.'],
  'Currency Converter': ['Live exchange rate integration.', 'Custom React hooks for API data.', 'A focused currency conversion interface.'],
  'Weather Forecast': ['Five-day weather forecasts.', 'OpenWeather API integration.', 'Location detection and weather data display.'],
  'Todo List App': ['Add, edit, and delete tasks.', 'Local storage persistence.', 'Offline access to saved tasks.'],
}
const description = project => project.description.replace('Fully automated, AI-powered', 'AI-powered').replace('Enterprise-ready RBAC-powered', 'Role-based').replace('High-performance personal', 'Personal')

function Artwork({ project, index }) {
  return <div className={`project-art art-${index % 4}`} aria-hidden="true"><div className="art-header"><span>{project.label}</span><span>0{index + 1} /</span></div>
    {index === 0 ? <div className="review-art"><div className="mini-window"><div className="window-dots"><i /><i /><i /><span>review-pipeline.yml</span></div><pre><span>on:</span> pull_request<br /><span>steps:</span><br />  → fetch changes<br />  → analyze with AI<br />  → scan for secrets<br />  → deliver review</pre></div><div className="review-chip"><FiCheck /> Context → clarity</div></div>
    : index === 1 ? <div className="inventory-art"><div><span>SWIFTSTOCK</span><FiLayers /></div><h4>Everything.<br />Accounted for.</h4><div className="inventory-bars">{[45, 68, 55, 88, 65, 95, 78].map((height, i) => <i style={{ height: `${height}%` }} key={i} />)}</div><span>INVENTORY / ANALYTICS / CONTROL</span></div>
    : index === 2 ? <div className="kanban-art">{['To do', 'Building', 'Done'].map((label, i) => <div key={label}><span><i />{label}</span><div /><div /><div className={i === 2 ? 'done' : ''} /></div>)}</div>
    : index === 3 ? <div className="editor-art"><div className="window-dots"><i /><i /><i /><span>idea.js — NexIDE</span></div><pre><span>const</span> idea = {'{'}<br />  editor: <em>'Monaco'</em>,<br />  runtime: <em>'browser'</em><br />{'}'};<br /><br /><span>build</span>(idea);<b>▍</b></pre><div className="editor-status"><span>JavaScript</span><span>Ready to build ●</span></div></div>
    : <div className="small-art"><FiCode /><strong>{['Generate.', 'Convert.', 'Forecast.', 'Organize.'][index - 4]}</strong><span>{project.title}</span><i>↗</i></div>}
  </div>
}
function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => { dialog.current.showModal() }, [])
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}><div className="project-dialog-body"><div className="dialog-top"><span className="mono">{category(project)} / PERSONAL PROJECT</span><button className="icon-button" autoFocus onClick={onClose} aria-label="Close project details"><FiX /></button></div><h2 id="project-dialog-title">{project.title}</h2><p>{description(project)}</p><h3>Inside the project</h3><ul className="feature-list">{features[project.title].map(feature => <li key={feature}><FiCheck />{feature}</li>)}</ul><h3>Built with</h3><ul className="tool-chips">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="dialog-links"><a className="button primary" href={project.github} target="_blank" rel="noopener noreferrer">View source <FiGithub /></a>{project.live && <a className="button secondary" href={project.live} target="_blank" rel="noopener noreferrer">Open live demo <FiArrowUpRight /></a>}</div></div></dialog>
}
export default function Projects() {
  const [filter, setFilter] = useState('All work')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const visible = order.filter(project => (filter === 'All work' || category(project) === filter) && `${project.title} ${project.description} ${project.tech.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()))
  return <section className="section shell work-section" id="projects"><div className="section-heading" data-reveal><div><span className="section-label"><span>01</span>SELECTED WORK</span><h2>Less talk.<br /><em>More building.</em></h2></div><p className="section-summary">A collection of ideas brought to life.<br />Find a project, explore the details, or dive into the code.</p></div>
    <div className="work-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>08</span>}</button>)}</div><label className="search-field project-search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects or tools" aria-label="Search projects or technologies" />{query && <button aria-label="Clear project search" onClick={() => setQuery('')}><FiX /></button>}</label></div>
    <div className="work-results"><span role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}{query && ` matching “${query}”`}</span><span>BUILT TO LEARN. MADE TO WORK.</span></div>
    <div className="work-grid" key={`${filter}:${query}`}>{visible.map(project => { const index = order.indexOf(project); return <article className="project-card" key={project.title} data-reveal><Artwork project={project} index={index} /><div className="project-body"><div className="project-title-row"><div><span className="project-category">{category(project)}</span><h3>{project.title}</h3></div><button className="round-arrow" onClick={() => setSelected(project)} aria-label={`Explore ${project.title}`}><FiArrowUpRight /></button></div><p>{description(project)}</p><ul className="tool-chips">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-bottom"><button onClick={() => setSelected(project)}>Explore project <FiArrowUpRight /></button><a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}><FiGithub /></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}><FiArrowUpRight /></a>}</div></div></article> })}</div>
    {!visible.length && <div className="empty-work"><FiSearch /><h3>No projects found.</h3><p>Try a different name or technology.</p><button className="button secondary" onClick={() => { setQuery(''); setFilter('All work') }}>Reset search & filters</button></div>}
    {selected && <ProjectDialog project={selected} onClose={() => setSelected(null)} />}
  </section>
}
