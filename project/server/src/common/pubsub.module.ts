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

        return new RedisPubSub({
          publisher: new Redis({ host, port }),
          subscriber: new Redis({ host, port }),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
