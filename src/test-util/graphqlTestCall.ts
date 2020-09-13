import { GraphQLSchema, graphql } from 'graphql';
import { createSchema } from '../util/createSchema';

let schema: GraphQLSchema;

export const graphqlTestCall = async (query: any, variables?: any) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql(
    schema,
    query,
    undefined,
    {},
    variables,
  );
};
