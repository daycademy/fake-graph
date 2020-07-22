import {
  Resolver, Mutation, UseMiddleware, Arg,
} from 'type-graphql';
import { User } from '../../../entity/User';
import { rateLimit } from '../../../middleware/rateLimit';
import { RegisterUserInput } from './RegisterUserInput';
import { UserRole } from '../../../entity/enums/UserRole';

@Resolver()
export class Register {
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
