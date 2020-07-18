import {
  ObjectType, Field, Int,
} from 'type-graphql';
import {
  Entity, Column, OneToMany, BaseEntity, PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { UserRole } from './enums/UserRole';
import { INode } from './interfaces/INode';

@ObjectType({ implements: INode })
@Entity()
export class User extends BaseEntity implements INode {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field(() => UserRole)
  @Column()
  role: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  fullname: string;

  @Field(() => Int)
  @Column('int')
  age: number;

  @Field(() => [Post], { defaultValue: [] })
  @OneToMany(() => Post, (post) => post.user)
  posts: Promise<Post[]>;
}
