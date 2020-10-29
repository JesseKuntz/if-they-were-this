import React from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'

const Quiz = ({ text }) => {
  return (
    <div className="scroll-piece quiz">
      <Navigate />
      <div className="text">{text} ✏️</div>
    </div>
  )
}

Quiz.propTypes = {
  text: PropTypes.node.isRequired,
}

export default Quiz
