import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Quiz from './quiz'
import './layout.css'

function shuffleArray(array) {
  const newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

function getQuizzes({
  quizzes: {
    allQuizzes: { data },
    quizSize,
  },
}) {
  const quizzes = shuffleArray(data).slice(0, quizSize)

  return quizzes.map((quiz, index) => {
    const firstQuiz = index === 0
    const finalQuiz = index === quizzes.length - 1

    return (
      <Quiz
        quiz={quiz}
        key={quiz.question}
        finalQuiz={finalQuiz}
        lazy={!firstQuiz}
      />
    )
  })
}

const QuizContainer = ({ quizzes }) => {
  if (!quizzes) return null

  useEffect(() => {
    window.lazyLoadInstance.update()
  })

  return getQuizzes({ quizzes })
}

QuizContainer.propTypes = {
  quizzes: PropTypes.object,
}

export default QuizContainer
