import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToOne,
} from 'typeorm';
import { User } from './User';
import Video from './Video';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
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
