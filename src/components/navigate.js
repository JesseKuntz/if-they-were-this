import React from 'react'

function scroll() {
  return window.scrollBy({
    top: document.documentElement.clientHeight,
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
