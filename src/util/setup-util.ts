import faker from 'faker';
import { User } from '../entity/User';
import { Post } from '../entity/Post';
import Video from '../entity/Video';
import { UserRole } from '../entity/enums/UserRole';

const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function insertData(): void {
  ids.forEach(async (id) => {
    await User.insert({
      id,
      role: faker.random.number(100) % 2 === 0
        ? UserRole.ADMIN.toString()
        : UserRole.USER.toString(),
      age: faker.random.number(100),
      fullname: faker.name.findName(),
      username: faker.internet.userName(),
    });

    await Post.insert({
      id,
      text: faker.lorem.paragraph(),
      userId: id,
    });

    await Video.insert({
      id,
      url: 'localhost:4000',
      postId: id,
    });
  });
}
