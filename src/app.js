import express from 'express';

import { config } from './config/config';
import { apolloSerer } from './graphql/graphql';

const app = express();
apolloSerer.applyMiddleware({ app });

app.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port}${apolloSerer.graphqlPath}`,
  );
});
