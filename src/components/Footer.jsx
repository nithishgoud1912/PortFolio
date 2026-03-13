import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const Footer = () => (
  <footer className="py-10 px-6 border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk' }}>NK<span className="text-[#00f0ff]">.</span></span>
        <p className="text-xs text-white/25" style={{ fontFamily: 'JetBrains Mono' }}>© 2026 L. Nithish Kumar Goud · Hyderabad</p>
      </div>
      <div className="flex items-center gap-5">
        {[
          { icon: <FiGithub size={17} />, href: 'https://github.com/nithishgoud1912', label: 'GitHub' },
          { icon: <FiLinkedin size={17} />, href: 'https://www.linkedin.com/in/lenkapothula-nithish-kumar-goud-2ab7a0313/', label: 'LinkedIn' },
          { icon: <FiMail size={17} />, href: 'mailto:nanigoud191206@gmail.com', label: 'Email' },
        ].map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-white/25 hover:text-[#00f0ff] transition-colors duration-300"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer