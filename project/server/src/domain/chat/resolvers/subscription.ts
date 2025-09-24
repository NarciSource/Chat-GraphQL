import { Inject } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { RedisStreams } from 'src/common/redis';
import { Message, MessagePayload, SystemInput, SystemPayload, TypingPayload } from '../model';

@Resolver()
export default class ChatSubscriptionResolver {
  constructor(
    @Inject('REDIS_PUBSUB')
    private pubSub: RedisPubSub,
    @Inject('REDIS_STREAMS')
    private streams: RedisStreams,
  ) {}

  @Subscription(() => Message, {
    name: 'message',
    filter: (payload: MessagePayload, { userId }: { userId: string }) =>
      payload.participants.includes(userId),
  })
  receiveMessage(@Args('userId') userId: string) {
    return this.streams.asyncIterator<MessagePayload>('message');
  }

  @Subscription(() => Message, {
    name: 'system',
    filter: (payload: SystemPayload, { input: { roomId, userId } }: { input: SystemInput }) =>
      payload.system.roomId === roomId || payload.system.userId === userId,
  })
  system(@Args('input') input: SystemInput) {
    return this.pubSub.asyncIterator<SystemPayload>('system');
  }

  @Subscription(() => Message, {
    name: 'typing',
    filter: (payload: TypingPayload, { roomId }: { roomId: string }) =>
      payload.typing.roomId === roomId,
  })
  onTyping(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterator<TypingPayload>('typing');
  }
}
