// A lightweight, professional background: fine dot-grid plus slow-drifting
// gradient blobs. Pure CSS (GPU-composited transforms), no per-frame JS or
// WebGL render loop — stays smooth on any device.
const AmbientBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] pointer-events-none">
    {/* Fine dot-grid texture */}
    <div
      className="absolute inset-0 opacity-[0.25]"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
      }}
    />

    {/* Slow-drifting ambient glows */}
    <div className="absolute -top-1/4 left-[10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-[#00f0ff]/[0.04] blur-[140px] animate-drift-slow" />
    <div className="absolute top-1/3 right-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#a855f7]/[0.04] blur-[140px] animate-drift-slow-reverse" />
    <div className="absolute bottom-[-10%] left-[30%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-[#ec4899]/[0.03] blur-[140px] animate-drift-slow" />

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050505_100%)]" />
  </div>
)

export default AmbientBackground
