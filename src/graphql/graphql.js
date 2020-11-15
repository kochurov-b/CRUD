import { ApolloServer } from 'apollo-server-express';

import schema from './graphql.types.graphql';
import { resolvers } from './graphql.resolvers';

export const apolloSerer = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
