import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import { config } from '../config/config';

const httpLink = new HttpLink({
  uri: config.apolloUri,
});

const wsLink = new WebSocketLink({
  uri: `ws://${config.host}${config.apolloUri}`,
  options: {
    reconnect: true,
  },
});

export const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
