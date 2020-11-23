import React from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'

import StarIconImage from '../images/gatsby-icon.png'

const Quiz = ({ quiz, showLoading }) => {
  return (
    <div className="scroll-piece quiz">
      <Navigate up={true} />
      <div className="text">{quiz.question}</div>
      <Navigate />
      {showLoading && <img src={StarIconImage} className="loading-indicator" />}
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
}

export default Quiz
