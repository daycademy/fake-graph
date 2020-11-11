import { PubSubEngine } from 'graphql-subscriptions';
import {
  PubSub, Mutation, Resolver, Arg,
} from 'type-graphql';

@Resolver()
export class NewNotification {
  @Mutation(() => String)
  async newNotification(@PubSub() pubSub: PubSubEngine, @Arg('title') title: string): Promise<string> {
    await pubSub.publish('NOTIFICATIONS', title);
    return title;
  }
}
