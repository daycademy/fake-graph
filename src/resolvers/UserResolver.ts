import {
  Query, Resolver, FieldResolver, Ctx, Root, UseMiddleware, Arg, Int, Mutation,
} from 'type-graphql';
import { User } from '../entity/User';
import { MyContext } from '../MyContext';
import { rateLimit } from '../middleware/rateLimit';
import { UserRole } from '../entity/enums/UserRole';
import { RegisterUserInput } from './RegisterUserInput';

@Resolver(() => User)
export class UserResolver {
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

  @Mutation(() => User)
  @UseMiddleware(rateLimit)
  async register(@Arg('data') newUserData: RegisterUserInput): Promise<User> {
    /* eslint-disable-next-line */
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(newUserData.email)) {
      throw new Error('email is not in a valid format');
    }

    const user = await User.findOne({ where: { email: newUserData.email } });
    if (user) {
      throw new Error('user already exists');
    }

    return User.create({
      email: newUserData.email,
      age: newUserData.age,
      role: UserRole.USER.toString(),
      fullname: newUserData.fullname,
      username: newUserData.username,
    });
  }
}
