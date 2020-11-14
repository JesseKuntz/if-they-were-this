/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Quiz from './quiz'
import './layout.css'

const Layout = ({ children, data }) => {
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
      <Header siteTitle={siteData.site.siteMetadata?.title || `Title`} />
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
      {data.map(quiz => (
        <Quiz text={quiz.question} key={quiz.question} />
      ))}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Layout
