import {
  Resolver, Query, UseMiddleware, Arg, Int, Root, FieldResolver, Ctx,
} from 'type-graphql';
import { Post } from '../../../entity/Post';
import { rateLimit } from '../../../middleware/rateLimit';
import { MyContext } from '../../../MyContext';

@Resolver(() => Post)
export class GetPosts {
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

  @FieldResolver()
  @UseMiddleware(rateLimit)
  video(@Ctx() { loaders }: MyContext, @Root() post: Post) {
    return loaders.videoLoader.load(post.id);
  }
}
