import {
  Resolver, Query, UseMiddleware, Arg,
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

  @Query(() => Post)
  @UseMiddleware(rateLimit)
  async post(@Arg('id') id: number): Promise<Post> {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      throw new Error(`cannot find post with post.id ${id}`);
    }

    return post;
  }
}
