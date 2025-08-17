import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { UserService } from './service';

@Resolver()
export class UserResolver {
  private pubSub = new PubSub();

  constructor(private readonly service: UserService) {}

  // Queries
  @Query(() => [String], { name: 'getUsers' })
  async getUsers() {
    return this.service.getUsers();
  }

  // Mutations
  @Mutation(() => Boolean, { name: 'setUser' })
  async setUser(@Args('id') id: string) {
    await this.service.registerUser(id);

    await this.pubSub.publish('userPresence', {
      userPresence: await this.service.getUsers(),
    });

    return true;
  }

  // Subscriptions
  @Subscription(() => [String], { name: 'userPresence' })
  userPresence() {
    return this.pubSub.asyncIterableIterator('userPresence');
  }
}
