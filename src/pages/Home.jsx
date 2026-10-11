import { useState } from 'react'
import Projects from '../components/Projects'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiCpu, FiDatabase, FiLayout, FiTerminal } from 'react-icons/fi'

import { blogArticles } from '../data/articles'

const github = 'https://github.com/nithishgoud1912'
const linkedin = 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/'
const email = 'mailto:nanigoud191206@gmail.com'
const skillIcons = [FiCpu, FiDatabase, FiLayout, FiTerminal]
const skills = [
  ['AI & automation', 'Connecting language models to useful workflows.', ['Groq API', 'Llama 3.3', 'n8n', 'GitHub API', 'Webhooks', 'Secret scanning']],
  ['Backend & data', 'The systems behind the experience.', ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'REST APIs', 'JWT', 'RBAC', 'Clerk']],
  ['Frontend & tools', 'From interface to implementation.', ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Shadcn UI', 'Docker', 'Git', 'OAuth']],
  ['Languages', 'A foundation for solving problems.', ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C']],
]
const journey = [
  ['2026 — Present', 'AI & backend engineering', 'Self-directed learning & projects', 'Building AI-powered development workflows with ReviewPilot, alongside SaaS platforms and backend systems.'],
  ['2025 — 2026', 'Full stack development', 'Personal projects', 'Developed Team Task Manager with role-based access, NexIDE, and a collection of React applications.'],
  ['2024 — 2025', 'Programming foundations', 'HackerRank & competitive coding', 'Built a foundation in C++, Java, algorithms, and practical problem solving.'],
  ['2024 — Present', 'Computer Science & Engineering', 'CBIT, Hyderabad · B.Tech', 'Studying algorithms, data structures, and software systems while learning through hands-on projects.'],
]
function ExternalLink({ href, children, className = '', ...props }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}
function SectionHeading({ number, label, title, children }) {
  return <div className="section-heading"><div><span className="eyebrow">{number} / {label}</span><h2>{title}</h2></div>{children && <div className="section-summary">{children}</div>}</div>
}
export default function Home() {
  const [emailStatus, setEmailStatus] = useState('')
  async function copyEmail() {
    try { await navigator.clipboard.writeText('nanigoud191206@gmail.com'); setEmailStatus('Email address copied') }
    catch { setEmailStatus('Could not copy. Use the email link to get in touch.') }
  }
  return <>
    <section className="intro-section editorial-intro" aria-labelledby="hero-title">
      <div className="editorial-topline"><span className="intro-role">AI Engineer & Backend Developer</span><span className="availability"><i /> Open to internship opportunities</span></div>
      <h1 id="hero-title" className="editorial-title"><span>Engineering ideas. </span><span>Intelligent <em>systems.</em></span></h1>
      <div className="intro-copy">
      <p className="intro-name">Hi, I’m Nithish Kumar Goud.</p>
      <p className="intro-description">I build AI-powered workflows and full stack applications, connecting language models with secure APIs, structured data, and practical automation.</p>
      <div className="intro-actions"><a className="button button-dark" href="#projects">See my projects <FiArrowUpRight /></a><a className="button button-outline" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">View résumé <FiArrowUpRight /></a></div>
      <div className="intro-links"><span>CBIT · CSE undergraduate</span><span>Hyderabad, India</span><ExternalLink href={github} aria-label="Nithish on GitHub"><FiGithub /></ExternalLink><ExternalLink href={linkedin} aria-label="Nithish on LinkedIn"><FiLinkedin /></ExternalLink><a href={email} aria-label="Email Nithish"><FiMail /></a></div>
    </div><aside className="engineering-card" aria-label="Engineering overview">
      <div className="engineer-profile"><img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Nithish Kumar Goud" fetchpriority="high" /><div><strong>Nithish Kumar Goud</strong><span>AI Engineer & Backend Developer</span></div><span className="profile-mark" aria-hidden="true">↗</span></div>
      <div className="engineering-card-body"><span className="eyebrow">MY ENGINEERING APPROACH</span><h2>From a model.<br />To a useful system.</h2><div className="system-flow" aria-hidden="true"><span><FiTerminal /><small>Input</small></span><i>→</i><span><FiCpu /><small>Intelligence</small></span><i>→</i><span><FiArrowUpRight /><small>Action</small></span></div>
        <div className="capability-row"><span>01</span><div><h3>Applied AI</h3><p>LLM integration & automated workflows</p></div></div><div className="capability-row"><span>02</span><div><h3>Backend systems</h3><p>APIs, databases & role-based access</p></div></div><div className="capability-row"><span>03</span><div><h3>End-to-end delivery</h3><p>Interfaces, integrations & deployment</p></div></div>
        <a href="#projects" className="overview-project"><span><small>EXPLORE MY AI WORK</small><strong>ReviewPilot</strong></span><FiArrowUpRight /></a>
      </div></aside></section>
    <div className="focus-strip"><span>AI & AUTOMATION</span><span>BACKEND ENGINEERING</span><span>FULL STACK DEVELOPMENT</span><a href="#projects">08 PERSONAL PROJECTS <FiArrowUpRight /></a></div>
    <Projects />
    <section className="page-section about" id="about"><SectionHeading number="02" label="ABOUT ME" title="About me." /><div className="about-body"><p className="lead">I’m L. Nithish Kumar Goud, a Computer Science undergraduate at CBIT, Hyderabad, working at the intersection of <em>AI and backend engineering.</em></p><div><p>My work connects language models with practical development workflows, and pairs them with the APIs, databases, and access controls that make software useful.</p><p>From an AI code review pipeline to inventory management and collaborative tools, I learn by building, testing, and refining. I care about clear architecture, secure defaults, and a good experience for the person using it.</p><a className="text-link" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">View my résumé <FiArrowUpRight /></a></div></div><div className="about-facts"><div><strong>08</strong><span>Projects in this portfolio</span></div><div><strong>AI + Web</strong><span>My engineering focus</span></div><div><strong>CBIT</strong><span>Computer Science & Engineering</span></div></div></section>
    <section className="page-section skills-section" id="skills"><SectionHeading number="03" label="TOOLKIT" title="Skills & technologies.">A practical stack for connecting intelligence, infrastructure, and interfaces.</SectionHeading><div className="skill-grid">{skills.map(([title, description, tools], i) => <article key={title}><div className="skill-card-top"><span className="skill-number">0{i + 1} /</span><span className="skill-icon" aria-hidden="true">{(() => { const Icon = skillIcons[i]; return <Icon /> })()}</span></div><h3>{title}</h3><p>{description}</p><ul className="tags">{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></article>)}</div></section>
    <section className="page-section journey-section" id="experience"><SectionHeading number="04" label="JOURNEY" title="Experience & education.">My path through computer science, personal projects, and applied AI.</SectionHeading><div className="journey-list">{journey.map(([date, title, place, description]) => <article key={title}><span className="journey-date">{date}</span><div><h3>{title}</h3><span className="journey-place">{place}</span><p>{description}</p></div><span className="journey-dot" aria-hidden="true" /></article>)}</div></section>
    <section className="page-section writing-section"><SectionHeading number="05" label="FIELD NOTES" title="Engineering notes."><Link className="text-link" to="/blog">All writing <FiArrowUpRight /></Link></SectionHeading><div className="writing-grid">{blogArticles.slice(0, 3).map(article => <Link className="writing-card" to={`/blog/${article.slug}`} key={article.id}><span className="eyebrow">{article.category}</span><h3>{article.title}</h3><span className="writing-meta">{article.readTime}<span className="writing-arrow"><FiArrowUpRight /></span></span></Link>)}</div></section>
    <section className="contact-section" id="contact"><span className="eyebrow">06 / LET’S CONNECT</span><div className="contact-heading"><h2>Build something<br />useful<span>.</span></h2><a href={email} className="contact-arrow" aria-label="Start a conversation by email"><FiArrowUpRight /></a></div><div className="contact-bottom"><p>Open to AI engineering and backend internships,<br />interesting projects, and good conversations.</p><div className="contact-email-group"><a className="contact-email" href={email}>nanigoud191206@gmail.com</a><button className="copy-email" onClick={copyEmail} aria-label="Copy email address">{emailStatus === 'Email address copied' ? 'Copied ✓' : 'Copy email'}</button><span className="sr-only" role="status">{emailStatus}</span></div><div className="contact-socials"><ExternalLink href={github}>GitHub ↗</ExternalLink><ExternalLink href={linkedin}>LinkedIn ↗</ExternalLink><a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">Résumé ↗</a></div></div></section>
  </>
}
