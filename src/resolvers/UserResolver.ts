import { Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { users } from '../util/setup-util';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    return users;
  }
}
