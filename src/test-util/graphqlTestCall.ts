import { GraphQLSchema } from 'graphql';
import { createSchema } from '../util/createSchema';

let schema: GraphQLSchema;

export const graphqlTestCall = async () => {
  if (!schema) {
    await createSchema();
  }
};
