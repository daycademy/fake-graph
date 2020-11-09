import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import costAnalysis from 'graphql-cost-analysis';
// import helmet from 'helmet';
import { PubSub } from 'type-graphql';
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

  const pubsub = PubSub();

  const apolloServer = new CostAnalysisApolloServer({
    schema: await createSchema(),
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

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
    insertData();
  });
})();
