import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const Footer = () => (
  <footer className="py-8 px-6 border-t border-white/[0.04]">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-lg font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NK<span className="text-[#00f0ff]">.</span></span>
        <p className="text-[10px] text-white/20" style={{ fontFamily: 'JetBrains Mono' }}>© 2026 L. Nithish Kumar Goud · Hyderabad</p>
      </div>
      <div className="flex items-center gap-4">
        {[
          { icon: <FiGithub size={15} />, href: 'https://github.com/nithishgoud1912', label: 'GitHub' },
          { icon: <FiLinkedin size={15} />, href: 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/', label: 'LinkedIn' },
          { icon: <FiMail size={15} />, href: 'mailto:nanigoud191206@gmail.com', label: 'Email' },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/20 hover:text-[#00f0ff]/70 transition-colors duration-300"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer