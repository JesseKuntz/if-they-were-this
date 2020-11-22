import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { scroll } from '../components/navigate'

const IndexPage = ({
  data: {
    fauna: {
      allQuizzes: { data, after },
    },
  },
}) => {
  return (
    <Layout data={data} after={after}>
      <SEO title="Home" />
      <div className="text">
        <span className="bold-brand">If They Were This</span> is a celebrity
        quiz game.
      </div>
      <div className="text">Put your pop-culture knowledge to the test.</div>
      <button onClick={() => scroll()}>Start</button>
      <div className="text">
        ...or if you are on your phone, just keep swiping!
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    fauna {
      allQuizzes(_size: 10) {
        data {
          question
          choices
          image
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
