import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowDown, FiGithub, FiLinkedin, FiMail, FiCpu, FiDatabase, FiLayout, FiCode, FiCheck, FiCopy, FiMapPin } from 'react-icons/fi'
import Projects from '../components/Projects'
import { blogArticles } from '../data/articles'

const github = 'https://github.com/nithishgoud1912'
const linkedin = 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/'
const skills = [
  { title: 'AI & automation', icon: FiCpu, note: 'Turning intelligence into something useful.', description: 'I connect language models to development workflows, APIs, and automation. ReviewPilot brings these pieces together in a code review pipeline.', tools: ['Groq API', 'Llama 3.3', 'n8n', 'GitHub API', 'Webhooks', 'Secret scanning'] },
  { title: 'Backend & data', icon: FiDatabase, note: 'The foundations that make everything work.', description: 'APIs, structured data, authentication, and access control. I build the systems behind inventory platforms and collaborative applications.', tools: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'REST APIs', 'JWT', 'RBAC', 'Clerk'] },
  { title: 'Interfaces & tools', icon: FiLayout, note: 'From an idea to an interface.', description: 'I turn application logic into interfaces with React and Next.js, and use version control, containers, and integrations to bring projects together.', tools: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Shadcn UI', 'Docker', 'Git', 'OAuth'] },
  { title: 'Languages', icon: FiCode, note: 'Different languages. One problem-solving mindset.', description: 'My foundations span scripting, web development, and algorithms. I choose a language around the problem and keep learning through hands-on projects.', tools: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C'] },
]
const journey = [
  ['2026 — Present', 'AI & backend engineering', 'Self-directed projects', 'Exploring AI development workflows with ReviewPilot, alongside SaaS platforms and backend systems.'],
  ['2025 — 2026', 'Full stack development', 'Personal projects', 'Building Team Task Manager, NexIDE, and practical applications with React and Node.js.'],
  ['2024 — Present', 'Computer Science & Engineering', 'CBIT, Hyderabad · B.Tech', 'Learning algorithms, data structures, and software systems through study and hands-on projects.'],
  ['2024 — 2025', 'Programming foundations', 'HackerRank & competitive coding', 'Building a foundation in C++, Java, algorithms, and practical problem solving.'],
]

function External({ href, children, ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
}
export function Heading({ number, label, title, children }) {
  return <div className="section-heading" data-reveal><div><span className="section-label"><span>{number}</span>{label}</span><h2>{title}</h2></div>{children && <div className="section-summary">{children}</div>}</div>
}

export default function Home() {
  const [skill, setSkill] = useState(0)
  const [emailStatus, setEmailStatus] = useState('')
  const ActiveIcon = skills[skill].icon
  async function copyEmail() {
    try { await navigator.clipboard.writeText('nanigoud191206@gmail.com'); setEmailStatus('Email copied') }
    catch { setEmailStatus('Use the email link to get in touch.') }
  }
  function onTabKey(event) {
    const offsets = { ArrowRight: 1, ArrowLeft: -1 }
    let next
    if (event.key in offsets) next = (skill + offsets[event.key] + skills.length) % skills.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = skills.length - 1
    if (next !== undefined) { event.preventDefault(); setSkill(next); document.getElementById(`skill-tab-${next}`).focus() }
  }
  return <>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="status-dot" /> Available for internships <span className="hero-year">PORTFOLIO / 2026</span></div>
        <h1 id="hero-title">Hi, I’m<br /><span>Nithish<span className="name-dot">.</span></span></h1>
        <div className="hero-role"><span className="role-line" /> AI engineer.<br /><span className="role-indent">Backend builder.</span></div>
        <p className="hero-description">I turn complex ideas into useful software.<br className="desktop-break" /> AI workflows, thoughtful interfaces, and the systems that connect them.</p>
        <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <FiArrowUpRight /></a><a className="button secondary" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">View résumé <FiArrowUpRight /></a></div>
        <div className="hero-socials"><External href={github} aria-label="Nithish on GitHub"><FiGithub /></External><External href={linkedin} aria-label="Nithish on LinkedIn"><FiLinkedin /></External><a href="mailto:nanigoud191206@gmail.com" aria-label="Email Nithish"><FiMail /></a><span><FiMapPin /> Hyderabad, India</span></div>
      </div>
      <div className="portrait-composition">
        <span className="portrait-orbit" aria-hidden="true" />
        <div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="L. Nithish Kumar Goud" fetchpriority="high" /><div className="portrait-caption"><span>THE PERSON BEHIND THE CODE</span><strong>Nithish Kumar Goud <FiArrowUpRight /></strong></div></div>
        <div className="portrait-sticker"><span aria-hidden="true">✳</span><p>Always curious.<br /><strong>Always building.</strong></p></div>
        <div className="portrait-badge"><span className="status-dot" /><span>CSE undergraduate <strong>CBIT, Hyderabad</strong></span></div>
        <span className="portrait-side-note">IDEAS → CODE → IMPACT</span>
      </div>
      <div className="hero-bottom"><span>Good software starts with a good question.</span><a href="#projects">SCROLL TO DISCOVER <FiArrowDown /></a></div>
    </section>
    <div className="discipline-band" aria-label="Engineering focus"><div>{['Applied AI', 'Backend systems', 'Full stack development', 'Creative problem solving'].map(item => <span key={item}>{item}<i aria-hidden="true">✳</i></span>)}</div></div>
    <Projects />
    <section className="section shell" id="about"><Heading number="02" label="A LITTLE ABOUT ME" title={<>Curiosity is my<br /><em>starting point.</em></>} />
      <div className="about-layout"><div className="about-manifesto" data-reveal><span className="large-asterisk" aria-hidden="true">✳</span><p>I like understanding how things work.<br />Then building something <span>better.</span></p><span className="mono">LEARN. BUILD. REFINE. REPEAT.</span></div>
        <div className="about-copy" data-reveal><p>I’m L. Nithish Kumar Goud, a Computer Science undergraduate at CBIT, Hyderabad. My work lives at the intersection of AI and backend engineering.</p><p>From an AI code review pipeline to inventory management and collaborative tools, I learn by building, testing, and refining. I care about clear architecture, secure defaults, and the person using the software.</p><a className="text-link" href="#experience">Follow my journey <FiArrowUpRight /></a></div></div>
      <div className="fact-row" data-reveal><div><strong>08<span> /</span></strong><span>Personal projects</span></div><div><strong>AI + Web</strong><span>Engineering focus</span></div><div><strong>CBIT</strong><span>Computer Science & Engineering</span></div></div>
    </section>
    <section className="section shell" id="skills"><Heading number="03" label="MY TOOLKIT" title={<>The right tools.<br /><em>For the right problems.</em></>}>Explore the technologies I use to connect intelligence, infrastructure, and interfaces.</Heading>
      <div className="toolkit" data-reveal><div className="skill-tabs" role="tablist" aria-label="Skill categories">{skills.map((item, index) => { const Icon = item.icon; return <button id={`skill-tab-${index}`} key={item.title} role="tab" aria-selected={skill === index} aria-controls="skill-panel" tabIndex={skill === index ? 0 : -1} onClick={() => setSkill(index)} onKeyDown={onTabKey}><Icon /><span>{item.title}</span><FiArrowUpRight /></button> })}</div>
        <div id="skill-panel" className="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${skill}`} tabIndex={0}><div className="skill-panel-content" key={skill}><div className="skill-panel-top"><span className="mono">0{skill + 1} / {skills[skill].title.toUpperCase()}</span><ActiveIcon /></div><h3>{skills[skill].note}</h3><p>{skills[skill].description}</p><ul className="tool-chips">{skills[skill].tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div>
      </div>
    </section>
    <section className="section shell" id="experience"><Heading number="04" label="THE JOURNEY" title={<>Learning by<br /><em>doing.</em></>}>A work in progress, in the best sense of the phrase.</Heading><div className="timeline">{journey.map(([date, title, place, description], index) => <article key={title} data-reveal><span className="timeline-index">0{index + 1}</span><span className="timeline-date">{date}</span><div><h3>{title}</h3><span className="timeline-place">{place}</span><p>{description}</p></div><FiArrowUpRight aria-hidden="true" /></article>)}</div></section>
    <section className="section shell writing-section"><Heading number="05" label="THINKING OUT LOUD" title={<>Notes from<br /><em>the build.</em></>}><Link className="text-link" to="/blog">All writing <FiArrowUpRight /></Link></Heading><div className="notes-grid">{blogArticles.slice(0, 3).map((article, index) => <Link className="note-card" to={`/blog/${article.slug}`} key={article.id} data-reveal><div><span className="mono">{article.category}</span><span className="note-number">0{index + 1}</span></div><h3>{article.title}</h3><div className="note-bottom"><span>{article.readTime}</span><span className="round-arrow"><FiArrowUpRight /></span></div></Link>)}</div></section>
    <section className="contact-wrap shell" id="contact"><div className="contact-panel" data-reveal><div className="contact-top"><span className="section-label">06 / NEXT CHAPTER</span><span className="contact-status"><span className="status-dot" /> Open to opportunities</span></div><h2>Something great<br />starts with <em>hello.</em><span aria-hidden="true">✳</span></h2><div className="contact-grid"><div><p>Have a project, an internship opportunity,<br />or just a good question? Let’s talk.</p><div className="contact-socials"><External href={github}>GitHub <FiArrowUpRight /></External><External href={linkedin}>LinkedIn <FiArrowUpRight /></External></div></div><div className="email-block"><a href="mailto:nanigoud191206@gmail.com">nanigoud191206@gmail.com <FiArrowUpRight /></a><button className="copy-button" onClick={copyEmail}>{emailStatus === 'Email copied' ? <FiCheck /> : <FiCopy />}{emailStatus === 'Email copied' ? 'Email copied' : 'Copy email address'}</button><span className="copy-status" role="status">{emailStatus === 'Email copied' ? '' : emailStatus}</span></div></div></div></section>
  </>
}
