import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
@Entity()
export default class Video extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Column('int')
  postId: number;

  @Field(() => Post)
  @OneToOne(() => Post, (post) => post.video)
  @JoinColumn()
  post: Promise<Post>;
}
