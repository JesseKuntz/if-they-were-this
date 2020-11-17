import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

import Quiz from './quiz'
import './layout.css'

const PAGES_FROM_BOTTOM = 3

const QUIZ_QUERY = gql`
  query Quizzes($cursor: String!) {
    allQuizzes(_size: 5, _cursor: $cursor) {
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

const QuizContainer = ({ data, after }) => {
  if (!data) return null

  const [quizzes, setQuizzes] = useState(data)
  const [cursor, setCursor] = useState(after)
  const cursorRef = useRef(cursor)

  const [getMoreQuizzes, { data: newQuizData }] = useLazyQuery(QUIZ_QUERY)

  useEffect(() => {
    if (window.innerHeight + window.scrollY === document.body.offsetHeight) {
      getMoreQuizzes({ variables: { cursor } })
    }

    window.addEventListener('scroll', () =>
      scrollHandler(getMoreQuizzes, cursorRef.current)
    )
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  if (newQuizData && newQuizData.allQuizzes.after !== cursor) {
    setQuizzes([...quizzes, ...newQuizData.allQuizzes.data])
    cursorRef.current = newQuizData.allQuizzes.after
    setCursor(newQuizData.allQuizzes.after)
  }

  return (
    quizzes && quizzes.map(quiz => <Quiz quiz={quiz} key={quiz.question} />)
  )
}

QuizContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default QuizContainer
