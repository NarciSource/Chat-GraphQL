import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Message } from './model';

@Resolver()
export class ChatResolver {
  private pubSub = new PubSub();

  // Queries
  @Query(() => String, { name: '_empty' })
  emptyQuery(): string {
    return 'ok';
  }

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
    return this.pubSub.asyncIterableIterator('message');
  }

  @Subscription(() => Message, {
    name: 'typing',
    filter: (payload: { typing: Message }, { roomId }: { roomId: string }) =>
      payload.typing.roomId === roomId,
  })
  onTyping(@Args('roomId') roomId: string) {
    return this.pubSub.asyncIterableIterator('typing');
  }
}
