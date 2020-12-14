import { buildSchema } from 'type-graphql';
import allResolvers from '../modules';

// TODO: Fix to normal index import and fix type
const resolvers: any = [
  allResolvers.CommonResolver,
  allResolvers.PostResolvers.GetPosts,
  allResolvers.UserResolvers.GetUsers,
  allResolvers.UserResolvers.Register,
  allResolvers.NotificationResolvers,
];

export const createSchema = () => buildSchema({
  resolvers,
  validate: true,
});
