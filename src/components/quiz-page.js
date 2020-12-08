import React from 'react'
import PropTypes from 'prop-types'

import Quiz from './quiz'
import HomeLink from './home-link'

import { useResizeHandler } from '../support/use-resize-handler'

const QuizPage = quiz => {
  useResizeHandler()

  return (
    <>
      <Quiz quiz={quiz.pageContext} singleQuiz={true} />
      <HomeLink />
    </>
  )
}

QuizPage.propTypes = {
  quiz: PropTypes.object,
}

export default QuizPage
