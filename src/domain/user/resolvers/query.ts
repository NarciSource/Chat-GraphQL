import { QueryBus } from '@nestjs/cqrs';
import { Query, Resolver } from '@nestjs/graphql';

import { GetUsersQuery } from '../queries';

@Resolver()
export default class UserQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [String], { name: 'getUsers' })
  async getUsers() {
    const query = new GetUsersQuery();
    return await this.queryBus.execute(query);
  }
}
