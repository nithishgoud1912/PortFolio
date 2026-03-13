import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const moveCursor = (e) => {
      // Offset by half of width/height (w-3: 12px -> 6px, w-8: 32px -> 16px)
      gsap.to(cursor, { x: e.clientX - 6, y: e.clientY - 6, duration: 0.1, ease: 'power2.out' })
      gsap.to(follower, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.5, ease: 'power2.out' })
    }
    const grow = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.5, duration: 0.3 })
      gsap.to(cursor, { scale: 0, duration: 0.3 })
    }
    const shrink = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }
    window.addEventListener('mousemove', moveCursor)
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener('mousemove', moveCursor); observer.disconnect() }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#00f0ff] rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-[#00f0ff]/50 rounded-full pointer-events-none z-[9997] hidden md:block" />
    </>
  )
}
export default CustomCursor