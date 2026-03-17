import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Ensure all pinned elements and layout shifts are resolved before refreshing ScrollTrigger
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    // Also observe the body height to seamlessly adapt the ScrollTriggers if height changes
    const observer = new ResizeObserver(() => ScrollTrigger.refresh())
    observer.observe(document.body)

    return () => { 
      clearTimeout(timeout)
      observer.disconnect()
      lenis.destroy() 
    }
  }, [])
  return <>{children}</>
}
export default SmoothScroll