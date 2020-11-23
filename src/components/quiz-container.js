import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

import Quiz from './quiz'
import './layout.css'

const PAGES_FROM_BOTTOM = 1

const QUIZ_QUERY = gql`
  query Quizzes($cursor: String!) {
    allQuizzes(_size: 20, _cursor: $cursor) {
      data {
        question
        choices
        image
      }
      after
    }
  }
`

function scrollHandler(getMoreQuizzes, cursor) {
  if (
    PAGES_FROM_BOTTOM * window.innerHeight + window.scrollY ===
    document.body.offsetHeight
  ) {
    getMoreQuizzes({ variables: { cursor } })
  }
}

function attachScrollListener({ getMoreQuizzes, cursorRef }) {
  useEffect(() => {
    window.addEventListener('scroll', () =>
      scrollHandler(getMoreQuizzes, cursorRef.current)
    )
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])
}

function getQuizzes({ quizzes, loading, newQuizData }) {
  if (!quizzes) {
    return null
  }

  return quizzes.map((quiz, index) => {
    const showLoading = loading && index === quizzes.length - 1
    const finalQuiz = !newQuizData && index === quizzes.length - 1

    return (
      <Quiz
        quiz={quiz}
        key={quiz.question}
        showLoading={showLoading}
        finalQuiz={finalQuiz}
      />
    )
  })
}

const QuizContainer = ({ data, after }) => {
  if (!data) return null

  const [quizzes, setQuizzes] = useState(data)
  const [cursor, setCursor] = useState(after)
  const cursorRef = useRef(cursor)

  const [getMoreQuizzes, { data: newQuizData, loading }] = useLazyQuery(
    QUIZ_QUERY
  )

  attachScrollListener({ getMoreQuizzes, cursorRef })

  if (newQuizData && newQuizData.allQuizzes.after !== cursor) {
    setQuizzes([...quizzes, ...newQuizData.allQuizzes.data])
    cursorRef.current = newQuizData.allQuizzes.after
    setCursor(newQuizData.allQuizzes.after)
  }

  return getQuizzes({ quizzes, loading, newQuizData })
}

QuizContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  after: PropTypes.string,
}

export default QuizContainer
