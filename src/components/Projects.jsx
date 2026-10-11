import { useState } from 'react'
import { FiArrowUpRight, FiGithub, FiLayers, FiCode, FiSun, FiCheckSquare, FiRepeat, FiKey } from 'react-icons/fi'
import { projects } from '../data/projects'

const groups = ['All projects', 'AI & automation', 'Full stack', 'Web apps']
const orderedProjects = [projects[1], projects[0], projects[2], projects[3], ...projects.slice(4)]
const category = title => title === 'ReviewPilot' ? groups[1] : ['SwiftStock', 'Team Task Manager', 'NexIDE'].includes(title) ? groups[2] : groups[3]
const details = {
  ReviewPilot: ['Git-triggered LLM reviews', 'Quality, bugs & security checks', 'Parallel secret scanning'],
  SwiftStock: ['Inventory tracking', 'Real-time analytics', 'Role-based dashboards'],
  'Team Task Manager': ['JWT authentication', 'Task assignment', 'Email notifications'],
  NexIDE: ['Monaco-powered editing', 'Browser code execution', 'OAuth integration'],
}
const icons = [FiLayers, FiLayers, FiLayers, FiCode, FiKey, FiRepeat, FiSun, FiCheckSquare]

function ProjectLinks({ project }) {
  return <div className="work-links">
    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source on GitHub`}>View source <FiGithub /></a>
    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}>Live demo <FiArrowUpRight /></a>}
  </div>
}
function ProjectVisual({ project, index }) {
  return <div className={`project-visual visual-${index}`} aria-hidden="true">
    <span className="visual-label">{project.label}</span>
    {index === 0 ? <div className="pipeline"><span>git push</span><i>↓</i><strong>ReviewPilot <span>✳</span></strong><i>↓</i><div><span>Quality</span><span>Security</span><span>Bugs</span></div><small>CODE → CONTEXT → REVIEW</small></div>
      : index === 1 ? <div className="stock-preview"><div>SwiftStock <span>● Live inventory</span></div><strong>Inventory, in sync.</strong><div className="bars">{[38, 62, 47, 82, 66, 93, 78].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><small>STOCK / ANALYTICS / CONTROL</small></div>
      : index === 2 ? <div className="task-preview">{['To do', 'In progress', 'Done'].map((title, i) => <div key={title}><small>{title}</small><span /><span /><span className={i === 2 ? 'done' : ''} /></div>)}</div>
      : <div className="ide-preview"><div><span /><span /><span /><small>NexIDE / workspace</small></div><pre><span>const</span> idea = {'{'}<br />  language: <em>'JavaScript'</em>,<br />  environment: <em>'browser'</em><br />{'}'};<br /><br /><span>build</span>(idea);<i>▍</i></pre><small>EDIT. RUN. ITERATE.</small></div>}
    <span className="visual-index">0{index + 1}</span>
  </div>
}
function WorkCard({ project, compact = false }) {
  const index = orderedProjects.indexOf(project)
  const Icon = icons[index]
  return <article className={`work-card${compact ? ' compact-work' : ''}`}>
    {compact ? <div className="compact-heading"><span className={`compact-icon visual-${index}`}><Icon aria-hidden="true" /></span><div><span className="eyebrow">{project.label}</span><h3>{project.title}</h3></div><span className="compact-number">0{index + 1}</span></div> : <ProjectVisual project={project} index={index} />}
    <div className="work-content">
      {!compact && <><span className="project-category">{category(project.title)} / Personal project</span><div className="work-title"><h3>{project.title}</h3><FiArrowUpRight aria-hidden="true" /></div></>}
      <p>{project.description.replace('Fully automated, AI-powered', 'AI-powered').replace('Enterprise-ready RBAC-powered', 'Role-based')}</p>
      {!compact && <ul className="project-details">{details[project.title].map(detail => <li key={detail}><span aria-hidden="true">✓</span>{detail}</li>)}</ul>}
      <ul className="tags">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <ProjectLinks project={project} />
    </div>
  </article>
}
export default function Projects() {
  const [filter, setFilter] = useState(groups[0])
  const visible = orderedProjects.filter(project => filter === groups[0] || category(project.title) === filter)
  const primary = visible.filter(project => orderedProjects.indexOf(project) < 4)
  const additional = visible.filter(project => orderedProjects.indexOf(project) >= 4)
  return <section className="page-section projects-section" id="projects">
    <div className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2>Ideas put into practice<span className="heading-period">.</span></h2></div><p className="section-summary">AI workflows, full stack systems, and the smaller experiments that shaped how I build.</p></div>
    <div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{groups.map(group => <button key={group} aria-pressed={filter === group} className={filter === group ? 'active' : ''} onClick={() => setFilter(group)}>{group}<span>{group === groups[0] ? '08' : String(orderedProjects.filter(p => category(p.title) === group).length).padStart(2,'0')}</span></button>)}</div><span className="project-count" role="status">{String(visible.length).padStart(2,'0')} projects</span></div>
    {primary.length > 0 && <div className="project-grid" key={`${filter}-primary`}>{primary.map(project => <WorkCard project={project} key={project.title} />)}</div>}
    {additional.length > 0 && <div className="additional-work"><div className="additional-heading"><h3>More things I’ve built</h3><p>Smaller applications. Practical lessons.</p></div><div className="compact-grid" key={`${filter}-additional`}>{additional.map(project => <WorkCard compact project={project} key={project.title} />)}</div></div>}
  </section>
}
