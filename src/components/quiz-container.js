import React, { useEffect, useState } from 'react'
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

function getQuizzes({ quizzes, quizResults, setQuizResults }) {
  return quizzes.map((quiz, index) => {
    const firstQuiz = index === 0
    const finalQuiz = index === quizzes.length - 1

    return (
      <Quiz
        quiz={quiz}
        key={quiz.question}
        finalQuiz={finalQuiz}
        lazy={!firstQuiz}
        quizResults={quizResults}
        setQuizResults={setQuizResults}
      />
    )
  })
}

const QuizContainer = ({ quizzes, quizResults, setQuizResults }) => {
  if (!quizzes) return null

  const [randomizedQuizzes, setRandomizedQuizzes] = useState([])

  useEffect(() => {
    setRandomizedQuizzes(
      shuffleArray(quizzes.allQuizzes.data).slice(0, quizzes.quizSize)
    )
  }, [])

  useEffect(() => {
    window.lazyLoadInstance.update()
  }, [randomizedQuizzes])

  return getQuizzes({ quizzes: randomizedQuizzes, quizResults, setQuizResults })
}

QuizContainer.propTypes = {
  quizzes: PropTypes.object,
  quizResults: PropTypes.any,
  setQuizResults: PropTypes.func,
}

export default QuizContainer
