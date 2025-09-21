import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from 'src/common/graphql';
import { RedisModule } from 'src/common/redis';
import { DynamoModule } from 'src/common/dynamo';
import * as events from 'src/domain/shared/events';
import { UserModule } from 'src/domain/user';
import { RoomModule } from 'src/domain/room';
import { ChatModule } from 'src/domain/chat';
import { HealthCheckController } from './controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule,
    RedisModule,
    DynamoModule,

    ...Object.values(events),
    UserModule,
    ChatModule,
    RoomModule,
  ],
  controllers: [HealthCheckController],
})
export class CoreModule {}
