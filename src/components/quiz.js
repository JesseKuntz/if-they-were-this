import React from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'
import Choice from './choice'

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

function getImage(url) {
  const newUrl = url.replace('http', 'https')
  return newUrl.replace(/\/v.+?\//g, `/e_trim/`)
}

const Quiz = ({ quiz, showLoading, finalQuiz }) => {
  return (
    <div className="scroll-piece quiz">
      <Navigate up={true} />
      <div className="text">{quiz.question}</div>
      <div className="quiz-content">
        <div className="quiz-image-container">
          <img className="quiz-image" src={getImage(quiz.image)} />
        </div>
        <div className="choices">
          {quiz.choices.map((choice, index) => (
            <Choice key={`${choice}:${index}`} text={choice} />
          ))}
        </div>
      </div>

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
