import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Post } from '../entity/Post';

type BatchPost = (keys: readonly number[]) => Promise<Post[][]>;

const batchPosts: BatchPost = async (keys: readonly number[]) => {
  const posts = await Post.find({
    where: { id: In(keys as number[]) },
  });

  const postsMap: Record<number, Post[]> = {};
  // FIXME: make it prettier
  posts.forEach((post) => {
    postsMap[post.id] = posts.filter((post2) => post2.id === post.id);
  });

  return keys.map((key) => postsMap[key]);
};

export const postLoader: DataLoader<number, Post[]> = new DataLoader(batchPosts);
