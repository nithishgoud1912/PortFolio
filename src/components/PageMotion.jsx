import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageMotion() {
  const progress = useRef(null)
  const { pathname } = useLocation()
  useEffect(() => {
    let frame = 0
    let artwork = []
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 761px)')
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight
      // Read positions together, then write only transforms for visible artwork.
      const positions = !preference.matches && desktop.matches ? artwork.filter(element => element.isConnected).map(element => {
        const bounds = element.getBoundingClientRect()
        if (bounds.bottom < 0 || bounds.top > innerHeight) return null
        const travel = ((innerHeight / 2 - (bounds.top + bounds.height / 2)) / innerHeight) * 32
        return { element, travel: Math.max(-18, Math.min(18, travel)) }
      }).filter(Boolean) : []
      progress.current?.style.setProperty('--progress', height > 0 ? Math.max(0, Math.min(1, scrollY / height)) : 0)
      document.documentElement.classList.toggle('has-scrolled', scrollY > 30)
      positions.forEach(({ element, travel }) => element.style.setProperty('--scroll-drift', `${travel.toFixed(2)}px`))
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(() => { update(); frame = 0 }) }
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    const sizeObserver = new ResizeObserver(queue)
    sizeObserver.observe(document.body)
    let observer
    let mutation
    const main = document.getElementById('main-content')
    let seen = new WeakSet()
    function setup() {
      observer?.disconnect()
      mutation?.disconnect()
      main.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'))
      artwork.forEach(element => element.style.removeProperty('--scroll-drift'))
      seen = new WeakSet()
      if (preference.matches) return
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }), { threshold: 0.06, rootMargin: '0px 0px -24px 0px' })
      const scan = () => {
        artwork = [...main.querySelectorAll('.portrait-frame, .project-art')]
        main.querySelectorAll('[data-reveal]').forEach(element => {
          if (seen.has(element)) return
          seen.add(element)
          if (element.getBoundingClientRect().bottom < 0) return
          const siblings = [...element.parentElement.children].filter(sibling => sibling.matches('[data-reveal]'))
          element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element) % 3 * 85, 170)}ms`)
          element.classList.add('reveal-pending')
          observer.observe(element)
        })
        queue()
      }
      scan()
      mutation = new MutationObserver(scan)
      mutation.observe(main, { childList: true, subtree: true })
    }
    setup()
    preference.addEventListener('change', setup)
    const resizeMotion = () => {
      if (!desktop.matches) artwork.forEach(element => element.style.removeProperty('--scroll-drift'))
      queue()
    }
    desktop.addEventListener('change', resizeMotion)
    update()
    return () => {
      observer?.disconnect()
      mutation?.disconnect()
      sizeObserver.disconnect()
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      preference.removeEventListener('change', setup)
      desktop.removeEventListener('change', resizeMotion)
      artwork.forEach(element => element.style.removeProperty('--scroll-drift'))
      cancelAnimationFrame(frame)
    }
  }, [pathname])
  return <div ref={progress} className="reading-progress" aria-hidden="true" />
}
