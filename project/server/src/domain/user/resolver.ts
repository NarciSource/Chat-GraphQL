import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UserService } from './service';
import { UserPresencePayload } from './model';

@Resolver()
export class UserResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
    private readonly service: UserService,
  ) {}

  // Queries
  @Query(() => [String], { name: 'getUsers' })
  async getUsers() {
    return this.service.getUsers();
  }

  // Mutations
  @Mutation(() => Boolean, { name: 'setUser' })
  async setUser(@Args('id') id: string) {
    await this.service.registerUser(id);

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
}
