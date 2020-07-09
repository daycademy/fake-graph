import {
  Query, Resolver, FieldResolver, Ctx, Root,
} from 'type-graphql';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver()
  posts(@Ctx() { loaders }: MyContext, @Root() user: User) {
    return loaders.postLoader.load(user.id);
  }
}
