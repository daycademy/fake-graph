import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  fullname: string;

  @Field()
  age: number;
}
