import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery } from 'react-apollo'
import { gql } from 'apollo-boost'

import Layout from '../components/layout'
import SEO from '../components/seo'
import GenerateQuizzesButton from '../components/generate-quizzes-button'
import Navigate from '../components/navigate'

import StarIconImage from '../images/gatsby-icon.png'

import { useResizeHandler } from '../support/use-resize-handler'

const QUIZ_SIZES = [10, 25, 50, 100]

const QUIZ_QUERY = gql`
  query Quizzes {
    allQuizzes(_size: 100) {
      data {
        question
        choices
        image
        name
        _id
      }
    }
  }
`

function resetResults() {
  window.localStorage.setItem('quiz-results', '{}')
}

function getGenerateQuizzesButtons({ getQuizzes, sizes, setQuizSize }) {
  return sizes.map(size => (
    <GenerateQuizzesButton
      getQuizzes={getQuizzes}
      size={size}
      setQuizSize={setQuizSize}
      key={size}
    />
  ))
}

function getDynamicSection({ loading, quizzes, getQuizzes, setQuizSize }) {
  if (loading) {
    return <img src={StarIconImage} className="loading-indicator" />
  }

  if (quizzes) {
    return (
      <>
        <div className="text">Your quiz awaits, scroll away!</div>
        <Navigate start={true} />
      </>
    )
  }

  return (
    <>
      <div className="text">
        Pick the number of questions you want in your quiz:
      </div>
      <div className="quiz-size-button-container">
        {getGenerateQuizzesButtons({
          getQuizzes,
          sizes: QUIZ_SIZES,
          setQuizSize,
        })}
      </div>
    </>
  )
}

const IndexPage = () => {
  const [quizSize, setQuizSize] = useState()

  useResizeHandler(resetResults)

  const [getQuizzes, { data: quizzes, loading }] = useLazyQuery(QUIZ_QUERY)

  let quizData
  if (quizzes) {
    quizData = {
      ...quizzes,
      quizSize,
    }
  }

  return (
    <Layout quizzes={quizData}>
      <SEO title="Home" />
      <div className="text">
        <span className="bold-brand">If They Were This</span> is a celebrity
        quiz game.
      </div>
      {getDynamicSection({ loading, quizzes, getQuizzes, setQuizSize })}
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
