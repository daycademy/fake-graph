import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export default class Video extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;
}
