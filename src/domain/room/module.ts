import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as queries from './quires';
import * as commands from './commands';
import { RoomMutationResolver, RoomSubscriptionResolver } from './resolvers';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [
    RoomMutationResolver,
    RoomSubscriptionResolver,
    ...Object.values(queries),
    ...Object.values(commands),
  ],
})
export default class RoomModule {}
