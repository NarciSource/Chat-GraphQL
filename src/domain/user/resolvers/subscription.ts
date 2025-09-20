import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UserPresencePayload } from '../model';

@Resolver()
export default class UserSubscriptionResolver {
  constructor(@Inject('REDIS_PUBSUB') private pubSub: RedisPubSub) {}

  @Subscription(() => [String], { name: 'userPresence' })
  userPresence() {
    return this.pubSub.asyncIterator<UserPresencePayload>('userPresence');
  }
}
