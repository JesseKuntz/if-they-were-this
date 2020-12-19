import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'
import Choice from './choice'
import Share from './share'

import StarIconImage from '../images/icon.png'

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

function clickHandler({ setClicked, id, correct, singleQuiz }) {
  setClicked(true)

  if (!singleQuiz) {
    const results =
      JSON.parse(window.localStorage.getItem('quiz-results')) || {}
    results[id] = correct
    window.localStorage.setItem('quiz-results', JSON.stringify(results))
  }
}

function getImage(src, lazy) {
  const baseClass = 'quiz-image'

  if (lazy) {
    return <img className={`${baseClass} lazy`} data-src={src} />
  }

  return <img className={baseClass} src={src} />
}

const Quiz = ({ quiz, showLoading, finalQuiz, singleQuiz, lazy }) => {
  const [clicked, setClicked] = useState()
  const [choices] = useState(scrambleChoices(quiz.choices))

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
