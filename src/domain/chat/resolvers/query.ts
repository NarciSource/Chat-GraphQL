import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { Message } from '../model';
import { GetMessageHistoryQuery, SearchMessagesByUserQuery } from '../queries';

@Resolver()
export default class ChatQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [Message], { name: 'history' })
  async getChatHistory(@Args('roomId') roomId: string) {
    const history = await this.queryBus.execute(new GetMessageHistoryQuery(roomId));

    return history;
  }

  @Query(() => [Message], { name: 'search' })
  async searchKeyword(@Args('userId') userId: string, @Args('keyword') keyword: string) {
    const found = this.queryBus.execute(new SearchMessagesByUserQuery(userId, keyword));

    return found;
  }
}
