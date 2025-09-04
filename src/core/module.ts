import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLModule } from 'src/common/graphql';
import { RedisModule } from 'src/common/redis';
import { UserModule } from 'src/domain/user';
import { RoomModule } from 'src/domain/room';
import { ChatModule } from 'src/domain/chat';
import { RepositoryModule } from 'src/repository';
import { HealthCheckController } from './controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule,
    RedisModule,

    RepositoryModule,

    UserModule,
    ChatModule,
    RoomModule,
  ],
  controllers: [HealthCheckController],
})
export class CoreModule {}
