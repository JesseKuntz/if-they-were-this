import React from 'react'
import PropTypes from 'prop-types'

function getClass(clicked, correct) {
  const baseClass = 'choice'

  if (clicked) {
    if (correct) {
      return `${baseClass} clicked correct`
    }

    return `${baseClass} clicked incorrect`
  }

  return baseClass
}

function Choice({ choice, clicked, setClicked, clickHandler, refToUse }) {
  if (choice.correct) {
    return (
      <button
        className={getClass(clicked, choice.correct)}
        onClick={() => clickHandler(setClicked)}
        disabled={clicked}
        ref={refToUse}
      >
        {choice.text}
      </button>
    )
  }

  return (
    <button
      className={getClass(clicked, choice.correct)}
      onClick={() => clickHandler(setClicked)}
      disabled={clicked}
    >
      {choice.text}
    </button>
  )
}

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  clicked: PropTypes.bool,
  setClicked: PropTypes.func,
  clickHandler: PropTypes.func.isRequired,
  refToUse: PropTypes.object,
}

export default Choice
