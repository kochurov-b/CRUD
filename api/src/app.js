import http from 'http';
import express from 'express';

import { config } from './config/config';
import { apolloSerer } from './graphql/graphql';
import { connectDb } from './helpers/connectDb.helper';

const app = express();
apolloSerer.applyMiddleware({ app });

const httpServer = http.createServer(app);
apolloSerer.installSubscriptionHandlers(httpServer);

const startServer = () => {
  const { port, mongoUri } = config;
  const { graphqlPath } = apolloSerer;

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}${graphqlPath}`);
    console.log(`Our database ${mongoUri}`);
  });
};

connectDb()
  .on('error', console.error)
  .on('disconnected', connectDb)
  .on('open', startServer);
