import { buildSchema } from 'type-graphql';
import allResolvers from '../modules';

// TODO: Fix to normal index import
const resolvers: [Function, ...Function[]] = [
  allResolvers.CommonResolver,
  allResolvers.PostResolvers.GetPosts,
  allResolvers.UserResolvers.GetUsers,
  allResolvers.UserResolvers.Register,
];

export const createSchema = () => buildSchema({
  resolvers,
  validate: true,
});
