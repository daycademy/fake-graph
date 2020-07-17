import { InputType, Field, Int } from 'type-graphql';
import { User } from '../entity/User';

@InputType()
export class RegisterUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  fullname: string;

  @Field(() => Int)
  age: number;
}
