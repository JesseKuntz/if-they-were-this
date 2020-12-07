import { useEffect } from 'react'

function resizeHandler() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function useResizeHandler(callback) {
  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    if (callback) {
      callback()
    }

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])
}

export { useResizeHandler }
