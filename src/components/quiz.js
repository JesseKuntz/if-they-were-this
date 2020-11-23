import React from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'

import StarIconImage from '../images/gatsby-icon.png'

function getBottomElement(showLoading, finalQuiz) {
  if (showLoading) {
    return <img src={StarIconImage} className="loading-indicator" />
  }

  if (finalQuiz) {
    return (
      <div className="final-quiz">🎉 You have reached the final quiz 🎉</div>
    )
  }

  return <Navigate />
}

const Quiz = ({ quiz, showLoading, finalQuiz }) => {
  return (
    <div className="scroll-piece quiz">
      <Navigate up={true} />
      <div className="text">{quiz.question}</div>
      {getBottomElement(showLoading, finalQuiz)}
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  finalQuiz: PropTypes.bool,
}

export default Quiz
