import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import costAnalysis from 'graphql-cost-analysis';
// import helmet from 'helmet';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';
import { insertData } from './util/setup-util';
import loaders from './loaders';
import { createSchema } from './util/createSchema';

class CostAnalysisApolloServer extends ApolloServer {
  async createGraphQLServerOptions(
    req: express.Request,
    res: express.Response,
  ) {
    const options = await super.createGraphQLServerOptions(req, res);

    options.validationRules = options.validationRules
      ? options.validationRules.slice()
      : [];
    options.validationRules.push(
      costAnalysis({
        variables: req.body.variables,
        maximumCost: 1000,
      }),
    );

    return options;
  }
}

(async () => {
  const app = express();
  /* if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  } */

  await createConnection();

  const pubsub = new RedisPubSub();

  const schema = await createSchema();
  const apolloServer = new CostAnalysisApolloServer({
    schema,
    playground: true,
    introspection: true,
    validationRules: [
      depthLimit(10),
    ],
    context: ({ req, res }) => ({
      req, res, loaders, pubsub,
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
    insertData();
  });
})();
