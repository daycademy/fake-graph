import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/UserResolver';
import { PostResolver } from '../resolvers/PostResolver';
import { CommonResolver } from '../resolvers/CommonResolver';

export const createSchema = () => buildSchema({
  resolvers: [UserResolver, PostResolver, CommonResolver],
  validate: true,
});
