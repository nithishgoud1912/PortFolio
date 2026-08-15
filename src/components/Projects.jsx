import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'SwiftStock', label: 'SaaS Project', description: 'Inventory management SaaS platform designed to streamline stock tracking for small to medium enterprises with real-time analytics and role-based dashboards.', tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Clerk.js'], live: 'https://swift-stock-seven.vercel.app/', github: 'https://github.com/nithishgoud1912/SwiftStock.git' },
  { title: 'ReviewPilot', label: 'AI & DevOps', description: 'Fully automated, AI-powered code review pipeline built on n8n. Intercepts GitHub diff patches via webhooks, performs safety/bug audits using Groq LLM (Llama 3.3), runs parallel regex secret scanners, and emails HTML reports.', tech: ['n8n', 'Groq API', 'GitHub API', 'Docker', 'ngrok'], github: 'https://github.com/nithishgoud1912/ReviewPilot.git' },
  { title: 'Team Task Manager', label: 'Full Stack', description: 'Enterprise-ready RBAC-powered project management system with admin-led project creation, task assignment, JWT authentication, and automated email notifications.', tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], github: 'https://github.com/nithishgoud1912/Task-Manager.git' },
  { title: 'NexIDE', label: 'Developer Tool', description: 'High-performance personal web-based IDE optimized for rapid development and browser-based code execution. Launchable via npx command.', tech: ['Next.js', 'Monaco Editor', 'OAuth'], github: 'https://github.com/nithishgoud1912/NexIDE.git' },
  { title: 'Password Generator', label: 'React App', description: 'A sleek, robust password generator that allows users to easily create secure, randomized passwords customized to their specific requirements.', tech: ['React', 'Vite', 'Tailwind CSS'], live: 'https://password-generator-two-sand-64.vercel.app/', github: 'https://github.com/nithishgoud1912/Password-Generator.git' },
  { title: 'Currency Converter', label: 'React App', description: 'Real-time currency conversion tool with live exchange rates and custom React hooks for seamless API integration.', tech: ['React', 'Custom Hooks', 'API'], live: 'https://currency-exchanger-swart.vercel.app/', github: 'https://github.com/nithishgoud1912/Currency-Exchanger.git' },
  { title: 'Weather Forecast', label: 'Vanilla JS', description: 'Real-time weather dashboard providing 5-day forecasts using OpenWeather API integration with beautiful UI and location detection.', tech: ['Vanilla JS', 'Fetch API', 'OpenWeather'], live: 'https://weather-ten-gules-19.vercel.app/', github: 'https://github.com/nithishgoud1912/Weather.git' },
  { title: 'Todo List App', label: 'Vanilla JS', description: 'Task management application with add, edit and delete functionality using local storage persistence for offline capability.', tech: ['Vanilla JS', 'Local Storage', 'CSS3'], live: 'https://todo-list-sepia-nu-20.vercel.app/', github: 'https://github.com/nithishgoud1912/Todo-list.git' },
]

const Projects = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } })
      gsap.fromTo(cardsRef.current?.querySelectorAll('.project-card'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16 flex flex-col items-center text-center">
          <span className="text-[#00f0ff]/60 text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ fontFamily: 'JetBrains Mono' }}>02 // PROJECTS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            Featured<br /><span className="gradient-text pb-1 inline-block">Works</span>
          </h2>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
export default Projects
