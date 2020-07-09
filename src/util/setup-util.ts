import faker from 'faker';
/* eslint-disable-next-line */
import { User } from '../entity/User';

export const users: Array<User> = [];

export function insertData(): void {
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
}
