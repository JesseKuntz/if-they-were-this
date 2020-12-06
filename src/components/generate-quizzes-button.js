import React from 'react'
import PropTypes from 'prop-types'

function GenerateQuizzesButton({ getQuizzes, size, setQuizSize }) {
  return (
    <button
      className="main-button"
      onClick={() => {
        getQuizzes({ variables: { size } })
        setQuizSize(size)
      }}
    >
      {size}
    </button>
  )
}

GenerateQuizzesButton.propTypes = {
  getQuizzes: PropTypes.func,
  size: PropTypes.number,
  setQuizSize: PropTypes.func,
}

export default GenerateQuizzesButton
