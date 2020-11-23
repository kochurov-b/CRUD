import { ApolloClient, InMemoryCache } from '@apollo/client';

import { link } from './apollo.link';

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
