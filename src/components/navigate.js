import React from 'react'

function isSafariOnIOS() {
  const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  return isSafari && iOS
}

function scroll() {
  const { clientHeight } = document.documentElement

  if (isSafariOnIOS()) {
    return window.scrollBy(0, clientHeight)
  }

  return window.scrollBy({
    top: clientHeight,
    behavior: 'smooth',
  })
}

const Navigate = () => {
  return (
    <div className="navigate-down-arrow" onClick={scroll}>
      ^
    </div>
  )
}

export { scroll }

export default Navigate
