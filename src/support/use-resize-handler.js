import { useEffect } from 'react'

function resizeHandler() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function useResizeHandler() {
  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])
}

export { useResizeHandler }
