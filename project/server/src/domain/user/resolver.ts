import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UserService } from './service';
import { UserPresencePayload } from './model';

@Resolver()
export class UserResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
    private readonly service: UserService,
  ) {
    void this.listenToDisconnect();
  }

  // Queries
  @Query(() => [String], { name: 'getUsers' })
  async getUsers() {
    return this.service.getUsers();
  }

  // Mutations
  @Mutation(() => Boolean, { name: 'setUser' })
  async setUser(@Args('id') userId: string, @Context() { sessionKey }: { sessionKey: string }) {
    await this.service.registerUser(userId, sessionKey);

    await this.pubSub.publish<UserPresencePayload>('userPresence', {
      userPresence: await this.service.getUsers(),
    });

    return true;
  }

  // Subscriptions
  @Subscription(() => [String], { name: 'userPresence' })
  userPresence() {
    return this.pubSub.asyncIterator<UserPresencePayload>('userPresence');
  }

  private async listenToDisconnect() {
    const asyncIterator: AsyncIterableIterator<{ sessionKey: string }> =
      this.pubSub.asyncIterator('disconnect');

    for await (const { sessionKey } of asyncIterator) {
      console.log('세션 삭제', sessionKey);

      await this.service.disconnectSession(sessionKey);
    }
  }
}
