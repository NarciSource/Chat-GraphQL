import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import GraphQLModule from 'src/common/graphql.module';
import { UserGateway } from 'src/domain/user/gateway';
import { UserService } from 'src/domain/user/service';
import { UsersController } from 'src/domain/user/controller';
import { RoomModule } from 'src/domain/room/module';
import { ChatModule } from 'src/domain/chat/module';
import { RepositoryModule } from 'src/repository/module';
import { HealthCheckController } from './controller';
import { CoreGateway } from './gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    GraphQLModule,

    RepositoryModule,

    ChatModule,
    RoomModule,
  ],
  controllers: [UsersController, HealthCheckController],
  providers: [CoreGateway, UserGateway, UserService],
})
export class CoreModule {}
