/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import QuizContainer from './quiz-container'
import ResultsPage from './results-page'

import './layout.css'

const Layout = ({ children, quizzes, hideSplash }) => {
  const [quizResults, setQuizResults] = useState()

  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="turn text">
        Please turn the screen back to portrait mode to keep playing!
      </div>
      {!hideSplash && (
        <Header siteTitle={siteData.site.siteMetadata?.title || `Title`} />
      )}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 20px`,
        }}
        className="scroll-piece"
      >
        {children}
      </div>
      <QuizContainer
        quizzes={quizzes}
        quizResults={quizResults}
        setQuizResults={setQuizResults}
      />
      <ResultsPage quizResults={quizResults} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  quizzes: PropTypes.object,
  hideSplash: PropTypes.bool,
}

export default Layout
