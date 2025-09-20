import { EventBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { PubSubPublishEvent, StreamsPublishEvent } from 'src/domain/shared/events';
import { MessagePayload, TypingPayload } from '../model';
import { GetPartitionsQuery } from '../queries';

@Resolver()
export default class ChatMutationResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  @Mutation(() => Boolean, { name: 'message' })
  async sendMessage(
    @Args('roomId') roomId: string,
    @Args('userId') userId: string,
    @Args('content') content: string,
  ) {
    const query = new GetPartitionsQuery(roomId);
    const participants = await this.queryBus.execute(query);

    const event = new StreamsPublishEvent<MessagePayload>('message', {
      message: { roomId, userId, content },
      participants,
    });
    await this.eventBus.publish(event);

    return true;
  }

  @Mutation(() => Boolean, { name: 'typing' })
  async typing(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const event = new PubSubPublishEvent<TypingPayload>('typing', {
      typing: { roomId, userId },
    });
    await this.eventBus.publish(event);

    return true;
  }
}
