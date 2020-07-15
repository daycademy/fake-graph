import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import { PostResolver } from '../resolvers/PostResolver';

export const createSchema = () => buildSchema({
  resolvers: [UserResolver, PostResolver],
  validate: true,
});
