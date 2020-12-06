import React from 'react'
import PropTypes from 'prop-types'

function getResults() {
  if (typeof window === 'undefined') {
    return {}
  }

  return JSON.parse(window.localStorage.getItem('quiz-results') || '{}')
}

function ResultsPage({ quizzes }) {
  return (
    <div className="scroll-piece">
      <div className="text">
        {quizzes
          ? 'Your quiz results will appear here once you have finished the quiz!'
          : 'Woah... where are you going? Pick a number above to start your quiz!'}
      </div>
    </div>
  )
}

ResultsPage.propTypes = {
  quizzes: PropTypes.object,
}

export default ResultsPage
