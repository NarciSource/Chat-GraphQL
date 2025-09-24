import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as commands from './commands';
import { RoomMutationResolver, RoomSubscriptionResolver } from './resolvers';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [RoomMutationResolver, RoomSubscriptionResolver, ...Object.values(commands)],
})
export default class RoomModule {}
