import { buildSchema } from 'type-graphql';
import allResolvers from '../modules';

const resolvers: any[] = [];
Object.entries(allResolvers).forEach((resolver) => resolvers.push(resolver));

export const createSchema = () => buildSchema({
  resolvers,
  validate: true,
});
