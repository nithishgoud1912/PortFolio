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

    const rotateX = (y - rect.height / 2) / 20
    const rotateY = (rect.width / 2 - x) / 20
    gsap.to(cardRef.current, { 
      rotateX, 
      rotateY, 
      scale: 1.02,
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
      duration: 0.7, 
      ease: 'elastic.out(1, 0.5)' 
    })
  }

  const colors = ['from-[#00f0ff]/20 to-[#a855f7]/10', 'from-[#a855f7]/20 to-[#ec4899]/10', 'from-[#ec4899]/20 to-[#00f0ff]/10', 'from-[#00f0ff]/10 to-[#ec4899]/20']
  const spotlightColor = ['rgba(0,240,255,0.08)', 'rgba(168,85,247,0.08)', 'rgba(236,72,153,0.08)', 'rgba(0,240,255,0.08)']

  return (
    <div ref={cardRef} className="project-card gradient-border group p-4 h-full flex flex-col transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(0,240,255,0.15)]" onMouseMove={handleMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleMouseLeave} style={{ transformStyle: 'preserve-3d' }}>
      <div className="relative bg-[#050505]/40 backdrop-blur-md rounded-[1.25rem] overflow-hidden p-4 flex flex-col h-full w-full border border-white/5" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Dynamic Spotlight Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor[index % 4]}, transparent 40%)`, opacity: hovered ? 1 : 0 }} />

        <div className={`relative z-10 h-56 overflow-hidden rounded-2xl bg-gradient-to-br ${colors[index % 4]} flex items-center justify-center shrink-0 transition-all duration-500 ease-out`} style={{ transform: hovered ? 'translateZ(40px) scale(1.02)' : 'translateZ(0) scale(1)' }}> 
          <span className={`text-[7rem] font-bold text-white/[0.04] transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`} style={{ fontFamily: 'Space Grotesk' }}>0{index + 1}</span>
          
          {project.label && (
            <span className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/25 backdrop-blur-md" style={{ fontFamily: 'JetBrains Mono' }}>
              {project.label}
            </span>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent flex items-end p-6 transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}> 
            <div className={`flex gap-3 w-full justify-center transition-all duration-500 delay-100 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full bg-[#00f0ff] text-[#0a0a0a] text-sm font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all w-full text-center shadow-[0_0_20px_rgba(0,240,255,0.3)] pointer-events-auto">
                  Live Demo ↗
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-[#00f0ff] hover:text-[#00f0ff] bg-[#0a0a0a]/50 backdrop-blur-md hover:scale-105 active:scale-95 transition-all w-full text-center pointer-events-auto">
                  Source ↗
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-6 pb-2 px-2 flex flex-col flex-grow relative z-10 transition-transform duration-500 ease-out" style={{ transform: hovered ? 'translateZ(30px)' : 'translateZ(0)' }}>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00f0ff] transition-colors shrink-0 flex items-center flex-wrap gap-3" style={{ fontFamily: 'Space Grotesk' }}>
            {project.title} 
            {project.wip && <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30" style={{ fontFamily: 'JetBrains Mono' }}>WIP</span>}
          </h3>
          <p className="text-white/70 text-[15px] mb-8 leading-relaxed flex-grow font-light">
            {project.description}
          </p>
          <div className={`flex flex-wrap gap-2 shrink-0 mt-auto transition-all duration-500 delay-75 ${hovered ? 'translate-y-0' : 'translate-y-1'}`}>
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1.5 rounded-md text-xs font-medium bg-white/5 text-white/90 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-colors" style={{ fontFamily: 'JetBrains Mono' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
