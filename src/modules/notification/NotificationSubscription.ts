import {
  Ctx, Mutation, Resolver, Subscription,
} from 'type-graphql';
import { MyContext } from '../../MyContext';

@Resolver()
export class NotificationSubscription {
  @Mutation(() => String)
  async newNotification(@Ctx() { pubsub }: MyContext): Promise<string> {
    const notification = 'Some New Notification';
    await pubsub.publish('NOTIFICATIONS', notification);
    return notification;
  }

  @Subscription(() => String, {
    topics: 'NOTIFICATIONS',
  })
  async notifications(): Promise<any> {
    return 'some notification';
  }
}
