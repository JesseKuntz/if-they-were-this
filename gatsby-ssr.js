/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_FAUNA_CLIENT_SECRET}`,
      },
    })
  },
})

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

export { wrapRootElement }
