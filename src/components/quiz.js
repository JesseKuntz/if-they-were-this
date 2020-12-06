import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Navigate from './navigate'
import Choice from './choice'
// import Share from './share'

import StarIconImage from '../images/gatsby-icon.png'

function getBottomElement(showLoading, finalQuiz) {
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

function getImage(url) {
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

function clickHandler(setClicked, id, correct) {
  setClicked(true)

  const results = JSON.parse(window.localStorage.getItem('quiz-results')) || {}
  results[id] = correct
  window.localStorage.setItem('quiz-results', JSON.stringify(results))
}

const Quiz = ({ quiz, showLoading, finalQuiz }) => {
  const [clicked, setClicked] = useState()
  const [choices] = useState(scrambleChoices(quiz.choices))

  return (
    <div className="scroll-piece quiz" id={quiz._id}>
      <Navigate up={true} />
      {/* <Share id={quiz._id} /> */}
      <div className="text">{quiz.question}</div>
      <div className="quiz-content">
        <div className="quiz-image-container">
          <img
            className="quiz-image"
            src={getImage(quiz.image)}
            loading="lazy"
          />
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
                  clickHandler(setClicked, quiz._id, choice.correct)
                }
              />
            ))}
        </div>
      </div>

      {getBottomElement(showLoading, finalQuiz)}
    </div>
  )
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  showLoading: PropTypes.bool,
  finalQuiz: PropTypes.bool,
}

export default Quiz
