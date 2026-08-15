import { useRef, useState } from 'react'
import { gsap } from 'gsap'

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    const rotateX = (y - rect.height / 2) / 25
    const rotateY = (rect.width / 2 - x) / 25
    gsap.to(cardRef.current, { 
      rotateX, 
      rotateY, 
      scale: 1.015,
      transformPerspective: 1000, 
      duration: 0.5, 
      ease: 'power2.out' 
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    gsap.to(cardRef.current, { 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1,
      duration: 0.6, 
      ease: 'elastic.out(1, 0.5)' 
    })
  }

  const accentColors = ['#00f0ff', '#a855f7', '#ec4899', '#00f0ff']
  const accent = accentColors[index % 4]

  return (
    <div
      ref={cardRef}
      className="project-card group rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${accent}08, transparent 40%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card header area */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center shrink-0">
        <span className="text-[6rem] font-bold text-white/[0.03] select-none" style={{ fontFamily: 'Space Grotesk' }}>0{index + 1}</span>
        
        {project.label && (
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/[0.05] border border-white/[0.08]"
            style={{ fontFamily: 'JetBrains Mono', color: accent + 'cc' }}
          >
            {project.label}
          </span>
        )}
        
        {/* Hover links overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent flex items-end p-5 transition-all duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`flex gap-3 w-full justify-center transition-all duration-400 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 w-full text-center" style={{ background: accent, color: '#0a0a0a' }}>
                Live Demo ↗
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-white/15 text-white/80 text-xs font-medium hover:border-white/30 bg-[#0a0a0a]/60 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all w-full text-center">
                Source ↗
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-5 pb-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-lg font-bold mb-2 text-white/90 group-hover:text-white transition-colors flex items-center flex-wrap gap-2" style={{ fontFamily: 'Space Grotesk' }}>
          {project.title}
        </h3>
        <p className="text-white/35 text-[13px] mb-5 leading-relaxed flex-grow font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 shrink-0 mt-auto">
          {project.tech.map((t, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/[0.04] text-white/40 border border-white/[0.05] group-hover:text-white/60 group-hover:border-white/[0.08] transition-colors" style={{ fontFamily: 'JetBrains Mono' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
