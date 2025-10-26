import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';

import { REDIS_PUBSUB } from 'src/common/symbols';
import Room, { RoomPayload } from '../model';

@Resolver()
export default class RoomSubscriptionResolver {
  constructor(@Inject(REDIS_PUBSUB) private pubSub: RedisPubSub) {}

  @Subscription(() => Room, {
    name: 'roomCreated',
    filter: (payload: RoomPayload, { userId }: { userId: string }) =>
      payload.roomCreated.participants.includes(userId),
  })
  roomCreated(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator<RoomPayload>('roomCreated');
  }
}
