import {
  Resolver, Query, UseMiddleware, Arg, Int,
} from 'type-graphql';
import { Post } from '../entity/Post';
import { rateLimit } from '../middleware/rateLimit';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  @UseMiddleware(rateLimit)
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  @UseMiddleware(rateLimit)
  async post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne({ where: { id } });
  }
}
