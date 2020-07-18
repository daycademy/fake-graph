import { ObjectType, Field } from 'type-graphql';
import {
  Entity, Column, ManyToOne, JoinColumn, BaseEntity, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import Video from './Video';
import { INode } from './interfaces/INode';

@ObjectType({ implements: INode })
@Entity()
export class Post extends BaseEntity implements INode {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Column('int')
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: Promise<User>;

  @Field(() => Video)
  @OneToOne(() => Video, (video) => video.post)
  video: Promise<Video>;
}
