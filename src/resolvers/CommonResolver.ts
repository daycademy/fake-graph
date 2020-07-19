import {
  Resolver, Query, Arg, ID, UseMiddleware,
} from 'type-graphql';
import { SearchResultUnion } from '../entity/unions/SearchResult';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { rateLimit } from '../middleware/rateLimit';

@Resolver()
export class CommonResolver {
  @Query(() => [SearchResultUnion])
  @UseMiddleware(rateLimit)
  async search(@Arg('id', () => ID) id: number): Promise<Array<Post | User>> {
    const posts = await Post.find({ where: { id } });
    const users = await User.find({ where: { id } });
    return [...posts, ...users];
  }
}
