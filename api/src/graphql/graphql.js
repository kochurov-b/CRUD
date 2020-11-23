import { ApolloServer, PubSub } from 'apollo-server-express';

import schema from './graphql.types.graphql';
import { resolvers } from './graphql.resolvers';

const pubSub = new PubSub();

export const apolloSerer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => ({ pubSub }),
});
