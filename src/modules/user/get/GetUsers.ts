import {
  Resolver, Query, UseMiddleware, Arg, Int, FieldResolver, Ctx, Root,
} from 'type-graphql';
import { User } from '../../../entity/User';
import { rateLimit } from '../../../middleware/rateLimit';
import { UserRole } from '../../../entity/enums/UserRole';
import { MyContext } from '../../../MyContext';

@Resolver(() => User)
export class GetUsers {
  @Query(() => [User])
  @UseMiddleware(rateLimit)
  users(@Arg('role', () => UserRole, { nullable: true }) userRole?: UserRole): Promise<User[]> {
    if (userRole) {
      return User.find({ where: { role: userRole } });
    }

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
