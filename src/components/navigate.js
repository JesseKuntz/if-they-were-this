import React from 'react'
import PropTypes from 'prop-types'

function scroll(up) {
  return window.scrollBy({
    top: document.documentElement.clientHeight * (up ? -1 : 1),
    behavior: 'smooth',
  })
}

function getClass(up) {
  const baseClass = 'navigate-arrow'

  if (up) {
    return `${baseClass} up`
  }

  return `${baseClass} down`
}

const Navigate = ({ up }) => {
  return (
    <div className={getClass(up)} onClick={() => scroll(up)}>
      ^
    </div>
  )
}

Navigate.propTypes = {
  up: PropTypes.bool,
}

export { scroll }

export default Navigate
