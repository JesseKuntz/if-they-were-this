import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { scroll } from '../components/navigate'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="text">
        <span className="bold-brand">If They Were This</span> is a celebrity
        quiz game.
      </div>
      <div className="text">Put your pop-culture knowledge to the test.</div>
      <button onClick={scroll}>Start</button>
      <div className="text">
        ...or if you are on your phone, just keep swiping!
      </div>
    </Layout>
  )
}

export default IndexPage
