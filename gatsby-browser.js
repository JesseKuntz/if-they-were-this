/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import smoothscroll from 'smoothscroll-polyfill';
import LazyLoad from 'vanilla-lazyload';
import 'emoji-sprinkle/window';

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_FAUNA_CLIENT_SECRET}`,
      },
    });
  },
});

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);

function onClientEntry() {
  smoothscroll.polyfill();
  window.lazyLoadInstance = new LazyLoad();
}

export { onClientEntry, wrapRootElement };
