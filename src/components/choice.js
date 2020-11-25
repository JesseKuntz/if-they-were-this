import React from 'react'
import PropTypes from 'prop-types'

function Choice({ text }) {
  return <div className="choice">{text}</div>
}

Choice.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Choice
