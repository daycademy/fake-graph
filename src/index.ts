import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';

(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
  });
})();
