import {
  Resolver, Query, Arg, ID, UseMiddleware,
} from 'type-graphql';
import { In } from 'typeorm';
import { SearchResultUnion } from '../entity/unions/SearchResult';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { rateLimit } from '../middleware/rateLimit';

@Resolver()
export class CommonResolver {
  @Query(() => [SearchResultUnion])
  @UseMiddleware(rateLimit)
  async search(@Arg('id', () => [ID]) ids: [number]): Promise<Array<Post | User>> {
    const posts = await Post.find({ where: { id: In(ids) } });
    const users = await User.find({ where: { id: In(ids) } });
    return [...posts, ...users];
  }
}
