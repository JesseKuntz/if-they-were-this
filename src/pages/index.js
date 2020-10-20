import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hey!</h1>
    <p>If They Were This is a celebrity quiz game.</p>
    <p>Put your pop-culture knowledge to the test.</p>
    <button>Start</button>
  </Layout>
)

export default IndexPage
