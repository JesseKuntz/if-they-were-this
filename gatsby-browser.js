/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import smoothscroll from 'smoothscroll-polyfill'

import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_CLIENT_SECRET}`,
      },
    })
  },
})

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

function onClientEntry() {
  smoothscroll.polyfill()
}

export { onClientEntry, wrapRootElement }
