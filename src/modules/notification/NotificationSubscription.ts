import { PubSubEngine } from 'graphql-subscriptions';
import {
  PubSub, Mutation, Resolver, Subscription, Root, Arg,
} from 'type-graphql';

@Resolver()
export class NotificationSubscription {
  @Mutation(() => String)
  async newNotification(@PubSub() pubSub: PubSubEngine, @Arg('title') title: string): Promise<string> {
    await pubSub.publish('NOTIFICATIONS', title);
    return title;
  }

  @Subscription(() => String, {
    topics: 'NOTIFICATIONS',
  })
  async notifications(@Root() payload: String): Promise<Object> {
    return `${new Date()} - ${payload}`;
  }
}
