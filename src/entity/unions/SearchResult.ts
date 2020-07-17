import { createUnionType } from 'type-graphql';
import { Post } from '../Post';
import { User } from '../User';

export const SearchResultUnion = createUnionType({
  name: 'SearchResult',
  types: () => [Post, User],
});
