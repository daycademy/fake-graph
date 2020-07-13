import {
  Query, Resolver, FieldResolver, Ctx, Root, UseMiddleware, Arg, Int,
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

  @Query(() => User)
  @UseMiddleware(rateLimit)
  user(@Arg('id', () => Int) id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } });
  }

  @FieldResolver()
  @UseMiddleware(rateLimit)
  posts(@Ctx() { loaders }: MyContext, @Root() user: User) {
    return loaders.postLoader.load(user.id);
  }
}
