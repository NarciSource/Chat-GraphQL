import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import { ChatMutationResolver, ChatSubscriptionResolver } from './resolvers';
import * as queries from './queries';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [ChatMutationResolver, ChatSubscriptionResolver, ...Object.values(queries)],
})
export default class ChatModule {}
