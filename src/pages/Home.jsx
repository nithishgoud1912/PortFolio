import { useEffect } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

const Home = () => {
  useEffect(() => {
    // Check if we navigated from another page with a target section
    const target = sessionStorage.getItem('scrollTarget')
    if (target) {
      sessionStorage.removeItem('scrollTarget')
      // Give a tiny timeout for the DOM and smooth-scroll library to be fully ready
      const timer = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  )
}

export default Home
