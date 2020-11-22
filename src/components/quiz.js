import React from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'

const Quiz = ({ quiz }) => {
  return (
    <div className="scroll-piece quiz">
      <Navigate up={true} />
      <Navigate />
      <div className="text">{quiz.question}</div>
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
}

export default Quiz
