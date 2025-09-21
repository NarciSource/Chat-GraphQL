import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Message } from '../model';
import { GetMessageHistoryQuery } from '../queries';

@Resolver()
export default class ChatQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [Message], { name: 'history' })
  async getChatHistory(@Args('roomId') roomId: string) {
    const history = await this.queryBus.execute(new GetMessageHistoryQuery(roomId));

    return history;
  }
}
