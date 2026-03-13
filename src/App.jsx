import { useState } from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgress from './components/ScrollProgress'
import { Canvas } from '@react-three/fiber'
import ParticleField from './components/ParticleField'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="noise-overlay">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <SmoothScroll>
          <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <ParticleField />
            </Canvas>
          </div>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </div>
  )
}

export default App