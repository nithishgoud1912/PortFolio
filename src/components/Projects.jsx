import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'SwiftStock', label: 'SaaS Project', description: 'Inventory management SaaS platform designed to streamline stock tracking for small to medium enterprises with real-time analytics and role-based dashboards.', tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Clerk.js'], live: 'https://swift-stock-seven.vercel.app/', github: 'https://github.com/nithishgoud1912/SwiftStock.git' },
  { title: 'Team Task Manager', label: 'Full Stack • Major', description: 'Enterprise-ready RBAC-powered project management system with admin-led project creation, task assignment, JWT authentication, and automated email notifications.', tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'], github: 'https://github.com/nithishgoud1912/Task-Manager.git' },
  { title: 'NexIDE', label: 'Developer Tool', description: 'High-performance personal web-based IDE optimized for rapid development and browser-based code execution. Launchable via npx command.', tech: ['Next.js', 'Monaco Editor', 'OAuth'], github: 'https://github.com/nithishgoud1912/NexIDE.git' },
  { title: 'Password Generator', label: 'React', description: 'A sleek, robust, and user-friendly Password Generator that allows users to easily generate secure, randomized passwords customized to their specific requirements.', tech: ['React', 'Vite', 'Tailwind CSS'],live: 'https://password-generator-two-sand-64.vercel.app/', github: 'https://github.com/nithishgoud1912/Password-Generator.git' },
  { title: 'Currency Converter', label: 'React', description: 'Real-time currency conversion tool with live exchange rates and custom React hooks for seamless API integration.', tech: ['React', 'Custom Hooks', 'API'], live: 'https://currency-exchanger-swart.vercel.app/', github: 'https://github.com/nithishgoud1912/Currency-Exchanger.git' },
  { title: 'Dynamic Weather Forecast', label: 'Vanilla JavaScript', description: 'Real-time weather dashboard providing 5-day forecasts using OpenWeather API integration with beautiful UI and location detection.', tech: ['Vanilla JS', 'Fetch API', 'OpenWeather'], live: 'https://weather-ten-gules-19.vercel.app/', github: 'https://github.com/nithishgoud1912/Weather.git' },
  { title: 'Todo List Application', label: 'Vanilla JavaScript', description: 'Task management application allowing users to add, edit and delete tasks using local storage persistence for offline capability.', tech: ['Vanilla JS', 'Local Storage', 'CSS3'], live: 'https://todo-list-sepia-nu-20.vercel.app/', github: 'https://github.com/nithishgoud1912/Todo-list.git' },
]

const Projects = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
      gsap.fromTo(cardsRef.current?.querySelectorAll('.project-card'), { y: 100, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-16 md:py-10 lg:py-12 px-6 md:px-12 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-12 flex flex-col items-center text-center">
          <span className="text-[#00f0ff] text-sm tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: 'JetBrains Mono' }}>02 // PROJECTS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold mt-4" style={{ fontFamily: 'Space Grotesk' }}>Featured<br /><span className="gradient-text pb-2 inline-block">Works</span></h2>
        </div>
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
export default Projects
