import { Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UserPresencePayload } from '../model';
import { GetUsersQuery } from '../queries';
import { DisconnectUserCommand, RegisterUserCommand } from '../commands';

@Resolver()
export default class UserMutationResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,

    @Inject('PUB_SUB') private pubSub: RedisPubSub,
  ) {
    void this.listenToDisconnect();
  }

  @Mutation(() => Boolean, { name: 'setUser' })
  async setUser(@Args('id') userId: string, @Context() { sessionKey }: { sessionKey: string }) {
    const command = new RegisterUserCommand(userId, sessionKey);
    await this.commandBus.execute(command);

    const query = new GetUsersQuery();
    const userPresence = await this.queryBus.execute(query);

    await this.pubSub.publish<UserPresencePayload>('userPresence', { userPresence });

    return true;
  }

  private async listenToDisconnect() {
    const asyncIterator: AsyncIterableIterator<{ sessionKey: string }> =
      this.pubSub.asyncIterator('disconnect');

    for await (const { sessionKey } of asyncIterator) {
      console.log('세션 삭제', sessionKey);

      const command = new DisconnectUserCommand(sessionKey);
      await this.commandBus.execute(command);
    }
  }
}
