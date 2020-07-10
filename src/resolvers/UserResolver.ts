import {
  Query, Resolver, FieldResolver, Ctx, Root, UseMiddleware,
} from 'type-graphql';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { rateLimit } from '../middleware/rateLimit';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  @UseMiddleware(rateLimit)
  users(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver()
  @UseMiddleware(rateLimit)
  posts(@Ctx() { loaders }: MyContext, @Root() user: User) {
    return loaders.postLoader.load(user.id);
  }
}
