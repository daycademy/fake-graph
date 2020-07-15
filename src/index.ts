import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { insertData } from './util/setup-util';
import loaders from './loaders';
import { createSchema } from './util/createSchema';

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }) => ({ req, res, loaders }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
    insertData();
  });
})();
