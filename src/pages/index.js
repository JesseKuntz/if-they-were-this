import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { scroll } from '../components/navigate'

function resizeHandler() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function scrollToQuiz() {
  const urlParams = new URLSearchParams(window.location.search)
  const quizId = urlParams.get('quiz')

  if (quizId) {
    document.getElementById(quizId).scrollIntoView()
  }
}

const IndexPage = ({
  data: {
    fauna: {
      allQuizzes: { data, after },
    },
  },
}) => {
  useEffect(() => {
    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    scrollToQuiz()

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <Layout data={data} after={after}>
      <SEO title="Home" />
      <div className="text">
        <span className="bold-brand">If They Were This</span> is a celebrity
        quiz game.
      </div>
      <div className="text">Put your pop-culture knowledge to the test.</div>
      <button className="start-button" onClick={() => scroll()}>
        Start
      </button>
      <div className="text">
        ...or if you are on your phone, just keep swiping!
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    fauna {
      allQuizzes(_size: 100) {
        data {
          question
          choices
          image
          _id
        }
        after
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
