import { InterfaceType, Field, ID } from 'type-graphql';

@InterfaceType()
export abstract class INode {
  @Field(() => ID)
  id: number;
}
