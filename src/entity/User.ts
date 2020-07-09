import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity,
} from 'typeorm';
import { Post } from './Post';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @Column('int')
  age: number;

  @Field(() => [Post], { defaultValue: [] })
  @OneToMany(() => Post, (post) => post.user)
  posts: Promise<Post[]>;
}
