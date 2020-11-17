import { ApolloClient, InMemoryCache } from '@apollo/client';

import { config } from '../config/config';

export const client = new ApolloClient({
  uri: config.apolloUri,
  cache: new InMemoryCache(),
});
