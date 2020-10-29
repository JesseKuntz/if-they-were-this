import React from 'react'

function scroll() {
  window.scrollBy({
    top: 100,
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
