import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { scroll } from '../components/navigate'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="home-text">If They Were This is a celebrity quiz game.</div>
    <div className="home-text">Put your pop-culture knowledge to the test.</div>
    <button onClick={scroll}>Start</button>
  </Layout>
)

export default IndexPage
