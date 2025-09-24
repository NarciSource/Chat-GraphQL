import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as queries from './queries';
import * as commands from './commands';
import { UserQueryResolver, UserMutationResolver, UserSubscriptionResolver } from './resolvers';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [
    UserQueryResolver,
    UserMutationResolver,
    UserSubscriptionResolver,
    ...Object.values(queries),
    ...Object.values(commands),
  ],
})
export default class UserModule {}
