import { Resolver, Root, Subscription } from 'type-graphql';

@Resolver()
export class NotificationsSubscription {
  @Subscription(() => String, {
    topics: 'NOTIFICATIONS',
  })
  async notifications(@Root() payload: String): Promise<Object> {
    return `${new Date()} - ${payload}`;
  }
}
