import {
  BaseEntity, Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Post } from './Post';
import { INode } from './interfaces/INode';

@ObjectType({ implements: INode })
@Entity()
export default class Video extends BaseEntity implements INode {
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
