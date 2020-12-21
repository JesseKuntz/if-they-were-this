import React, { useState } from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'vanilla-lazyload'

import Navigate from './navigate'
import Choice from './choice'
import Share from './share'

import StarIconImage from '../images/icon.png'

const EMOJI_COUNT = 100
const EMOJI_PADDING = 44

function getBottomElement({ showLoading, finalQuiz, singleQuiz }) {
  if (singleQuiz) {
    return null
  }

  if (showLoading) {
    return <img src={StarIconImage} className="loading-indicator" />
  }

  if (finalQuiz) {
    return (
      <div className="final-quiz">🎉 You have reached the final quiz 🎉</div>
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

function clickHandler({ setClicked, id, correct, singleQuiz, setCorrect }) {
  setClicked(true)
  setCorrect(correct)

  if (!singleQuiz) {
    const results =
      JSON.parse(window.localStorage.getItem('quiz-results')) || {}
    results[id] = correct
    window.localStorage.setItem('quiz-results', JSON.stringify(results))

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

function getGrades(correct) {
  if (correct === undefined) {
    return null
  }

  const yPositions = Array.from({ length: EMOJI_COUNT }, () =>
    Math.floor(Math.random() * (window.innerHeight - EMOJI_PADDING))
  )
  const xPositions = Array.from({ length: EMOJI_COUNT }, () =>
    Math.floor(Math.random() * (window.innerWidth - EMOJI_PADDING))
  )
  const fadeValues = Array.from(
    { length: EMOJI_COUNT },
    () => Math.random() * 2.5
  )

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

const Quiz = ({ quiz, showLoading, finalQuiz, singleQuiz, lazy }) => {
  const [clicked, setClicked] = useState()
  const [choices] = useState(scrambleChoices(quiz.choices))
  const [correct, setCorrect] = useState()

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
        <div className="choices">
          {choices &&
            choices.map((choice, index) => (
              <Choice
                key={`${choice.text}:${index}`}
                choice={choice}
                clicked={clicked}
                setClicked={setClicked}
                clickHandler={() =>
                  clickHandler({
                    setClicked,
                    setCorrect,
                    id: quiz._id,
                    correct: choice.correct,
                    singleQuiz,
                  })
                }
              />
            ))}
        </div>
      </div>

      {getBottomElement({ showLoading, finalQuiz, singleQuiz })}

      {getGrades(correct)}
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  finalQuiz: PropTypes.bool,
  singleQuiz: PropTypes.bool,
  lazy: PropTypes.bool,
}

export default Quiz
