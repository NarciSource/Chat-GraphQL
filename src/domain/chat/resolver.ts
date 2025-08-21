import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { Message, SystemInput } from './model';

@Resolver()
export class ChatResolver {
  constructor(@Inject('PUB_SUB') private pubSub: RedisPubSub) {}

  // Mutations
  @Mutation(() => Boolean, { name: 'message' })
  async sendMessage(
    @Args('roomId') roomId: string,
    @Args('userId') userId: string,
    @Args('content') content: string,
  ) {
    await this.pubSub.publish('message', {
      message: { roomId, userId, content },
    });

    return true;
  }

  @Mutation(() => Boolean, { name: 'typing' })
  async typing(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    await this.pubSub.publish('typing', {
      typing: { roomId, userId },
    });

    return true;
  }

  // Subscriptions
  @Subscription(() => Message, {
    name: 'message',
    filter: (payload: { message: Message }, { roomId }: { roomId: string }) =>
      payload.message.roomId === roomId,
  })
  receiveMessage(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterator('message');
  }

  @Subscription(() => Message, {
    name: 'system',
    filter: (payload: { system: Message }, { input: { roomId, userId } }: { input: SystemInput }) =>
      payload.system.roomId === roomId || payload.system.userId === userId,
  })
  system(@Args('input') input: SystemInput) {
    return this.pubSub.asyncIterator('system');
  }

  @Subscription(() => Message, {
    name: 'typing',
    filter: (payload: { typing: Message }, { roomId }: { roomId: string }) =>
      payload.typing.roomId === roomId,
  })
  onTyping(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterator('typing');
  }
}
