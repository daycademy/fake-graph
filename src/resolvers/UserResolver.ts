import { Query, Resolver } from 'type-graphql';
import faker from 'faker';
import { User } from '../entity/User';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    const users: Array<User> = [];
    for (let i = 0; i < 10; i += 1) {
      users.push(
        {
          id: i,
          age: faker.random.number(100),
          fullname: faker.name.findName(),
          username: faker.internet.userName(),
        },
      );
    }
    return users;
  }
}
