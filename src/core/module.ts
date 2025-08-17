import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import GraphQLModule from 'src/common/graphql.module';
import { UserModule } from 'src/domain/user/module';
import { RoomModule } from 'src/domain/room/module';
import { ChatModule } from 'src/domain/chat/module';
import { RepositoryModule } from 'src/repository/module';
import { HealthCheckController } from './controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule,

    RepositoryModule,

    UserModule,
    ChatModule,
    RoomModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class CoreModule {}
