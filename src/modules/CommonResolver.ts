import {
  Resolver, Query, Arg, ID, UseMiddleware,
} from 'type-graphql';
import { In } from 'typeorm';
import { SearchResultUnion } from '../entity/unions/SearchResult';
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { rateLimit } from '../middleware/rateLimit';
import { INode } from '../entity/interfaces/INode';

@Resolver()
export class CommonResolver {
  @Query(() => [SearchResultUnion])
  @UseMiddleware(rateLimit)
  async search(@Arg('id', () => [ID]) ids: [number]): Promise<Array<Post | User>> {
    const posts = await Post.find({ where: { id: In(ids) } });
    const users = await User.find({ where: { id: In(ids) } });
    return [...posts, ...users];
  }

  @Query(() => INode, { nullable: true })
  @UseMiddleware(rateLimit)
  async node(@Arg('id', () => ID, { description: 'The ID of the object' }) id: number): Promise<INode | undefined> {
    const user = await User.findOne({ where: { id } });
    if (user) {
      return user;
    }

    const post = await Post.findOne({ where: { id } });
    if (post) {
      return post;
    }

    return undefined;
  }
}
