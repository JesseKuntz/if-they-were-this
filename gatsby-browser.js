/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import smoothscroll from 'smoothscroll-polyfill';
import LazyLoad from 'vanilla-lazyload';
import 'emoji-sprinkle/window';

const link = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.GATSBY_FAUNA_CLIENT_SECRET}`,
  },
});

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  cache,
  link,
});

const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);

function onClientEntry() {
  smoothscroll.polyfill();
  window.lazyLoadInstance = new LazyLoad();
}

export { onClientEntry, wrapRootElement };
