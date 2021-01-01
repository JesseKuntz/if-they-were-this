import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'vanilla-lazyload'

import Navigate from './navigate'
import Choice from './choice'
import Share from './share'

import { getScrollbarWidth } from '../support/get-scrollbar-width'

const EMOJI_COUNT = 100
const EMOJI_PADDING = 44
const MAX_FADE = 2

function getBottomElement({ finalQuiz, singleQuiz }) {
  if (singleQuiz) {
    return null
  }

  if (finalQuiz) {
    return (
      <>
        <div className="final-quiz">
          🎉 You have reached the final quiz 🎉 Keep scrolling to see your
          results!
        </div>
        <Navigate />
      </>
    )
  }

  return <Navigate />
}

function getImageSrc(url) {
  const newUrl = url.replace('http', 'https')
  return newUrl.replace(/\/v.+?\//g, `/e_trim/`)
}

function scrambleChoices(choices) {
  const choicesWithData = choices.map((choice, index) => ({
    text: choice,
    correct: index === 0,
  }))

  return choicesWithData
    .map(a => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
}

function clickHandler({
  setClicked,
  quiz,
  correct,
  singleQuiz,
  setCorrect,
  choicesContainer,
  correctChoice,
  quizResults,
  setQuizResults,
}) {
  setClicked(true)
  setCorrect(correct)

  const gap = window.innerWidth - correctChoice.current.offsetWidth

  choicesContainer.current.scrollTo({
    top: 0,
    left: correctChoice.current.offsetLeft - gap / 2,
    behavior: 'smooth',
  })

  if (!singleQuiz) {
    const results = quizResults ? [...quizResults] : []
    results.push({ name: quiz.name, correct })

    setQuizResults(results)

    const nextImage = document.querySelector('.quiz-image.lazy:not(.loaded)')
    if (nextImage) {
      LazyLoad.load(nextImage)
    }
  }
}

function getImage(src, lazy) {
  const baseClass = 'quiz-image'

  if (lazy) {
    return <img className={`${baseClass} lazy`} data-src={src} />
  }

  return <img className={baseClass} src={src} />
}

function getGrades(correct, explosionTriggered, setExplosionTriggered) {
  if (correct === undefined || explosionTriggered) {
    return null
  }

  const scrollbarWidth = getScrollbarWidth()

  const yPositions = Array.from({ length: EMOJI_COUNT }, () =>
    Math.floor(Math.random() * (window.innerHeight - EMOJI_PADDING))
  )
  const xPositions = Array.from({ length: EMOJI_COUNT }, () =>
    Math.floor(
      Math.random() * (window.innerWidth - EMOJI_PADDING - scrollbarWidth)
    )
  )
  const fadeValues = Array.from(
    { length: EMOJI_COUNT },
    () => Math.random() * MAX_FADE
  )

  setTimeout(() => setExplosionTriggered(true), MAX_FADE * 1000)

  return yPositions.map((y, index) => {
    const x = xPositions[index]
    const fade = fadeValues[index]

    return (
      <div
        className="grade"
        style={{ left: x, top: y, animation: `fade ${fade}s forwards` }}
        key={`${x}:${y}`}
      >
        {correct ? '💋' : '❌'}
      </div>
    )
  })
}

const Quiz = ({
  quiz,
  showLoading,
  finalQuiz,
  singleQuiz,
  lazy,
  quizResults,
  setQuizResults,
}) => {
  const [clicked, setClicked] = useState()
  const [choices] = useState(scrambleChoices(quiz.choices))
  const [correct, setCorrect] = useState()
  const [explosionTriggered, setExplosionTriggered] = useState(false)
  const choicesContainer = useRef(null)
  const correctChoice = useRef(null)

  return (
    <div className="scroll-piece quiz" id={quiz._id}>
      {!singleQuiz && (
        <>
          <Navigate up={true} /> <Share name={quiz.name} />
        </>
      )}

      <div className="text">{quiz.question}</div>
      <div className="quiz-content">
        <div className="quiz-image-container">
          {getImage(getImageSrc(quiz.image), lazy)}
        </div>
        <div className="choices" ref={choicesContainer}>
          {choices &&
            choices.map((choice, index) => (
              <Choice
                refToUse={correctChoice}
                key={`${choice.text}:${index}`}
                choice={choice}
                clicked={clicked}
                setClicked={setClicked}
                clickHandler={() =>
                  clickHandler({
                    setClicked,
                    setCorrect,
                    quiz,
                    correct: choice.correct,
                    singleQuiz,
                    choicesContainer,
                    correctChoice,
                    quizResults,
                    setQuizResults,
                  })
                }
              />
            ))}
        </div>
      </div>

      {getBottomElement({ showLoading, finalQuiz, singleQuiz })}

      {getGrades(correct, explosionTriggered, setExplosionTriggered)}
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  finalQuiz: PropTypes.bool,
  singleQuiz: PropTypes.bool,
  lazy: PropTypes.bool,
  quizResults: PropTypes.any,
  setQuizResults: PropTypes.func,
}

export default Quiz
