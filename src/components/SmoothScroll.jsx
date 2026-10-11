import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const ScrollContext = createContext(null)
export const useSmoothScroll = () => useContext(ScrollContext)

export default function SmoothScroll({ children }) {
  const engine = useRef(null)
  const scrollTo = useCallback((target, { immediate = false, onComplete } = {}) => {
    const element = typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target
    if (element == null) return
    const header = document.querySelector('.site-header')
    const offset = typeof element === 'number' ? 0 : -(header?.offsetHeight || 80) - 20
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (engine.current) {
      if (engine.current.isStopped && !document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove('modal-open')
        engine.current.start()
      }
      engine.current.resize()
      const destination = typeof element === 'number' ? element : window.scrollY + element.getBoundingClientRect().top + offset
      engine.current.scrollTo(element, {
        offset, immediate: immediate || reduced, force: true,
        duration: Math.min(1.45, Math.max(0.8, Math.abs(destination - window.scrollY) / 6500)),
        easing: value => 1 - Math.pow(1 - value, 4), onComplete,
      })
    } else {
      const top = typeof element === 'number' ? element : window.scrollY + element.getBoundingClientRect().top + offset
      window.scrollTo({ top, behavior: immediate || reduced ? 'instant' : 'smooth' })
      onComplete?.()
    }
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let modalObserver
    function configure() {
      modalObserver?.disconnect()
      engine.current?.destroy()
      engine.current = null
      document.documentElement.classList.remove('modal-open')
      const lenis = preference.matches ? null : new Lenis({
        autoRaf: true, lerp: 0.085, smoothWheel: true, syncTouch: false,
        prevent: node => !!node.closest('dialog, pre, [data-native-scroll]'),
      })
      engine.current = lenis
      const syncModal = () => {
        const open = !!document.querySelector('dialog[open]')
        document.documentElement.classList.toggle('modal-open', open)
        if (lenis && open && !lenis.isStopped) lenis.stop()
        else if (lenis && !open && lenis.isStopped) lenis.start()
      }
      modalObserver = new MutationObserver(syncModal)
      modalObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] })
      syncModal()
    }
    configure()
    preference.addEventListener('change', configure)
    return () => {
      preference.removeEventListener('change', configure)
      modalObserver?.disconnect()
      engine.current?.destroy()
      engine.current = null
      document.documentElement.classList.remove('modal-open')
    }
  }, [])
  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>
}
