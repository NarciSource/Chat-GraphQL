import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);

        pubSubInstance = new RedisPubSub({
          publisher: new Redis({ host, port }),
          subscriber: new Redis({ host, port }),
        });

        return pubSubInstance;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}

// 공용 PubSub 인스턴스
let pubSubInstance: RedisPubSub;
export const getPubSubInstance = () => pubSubInstance;
