import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisPubSub');
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);

        const publisher = new Redis({ host, port, lazyConnect: true });
        const subscriber = new Redis({ host, port, lazyConnect: true });

        try {
          await Promise.all([publisher.connect(), subscriber.connect()]);
          logger.log(`${host}:${port}에 연결 완료`);
        } catch (error) {
          logger.error(`${host}:${port} 연결 실패`, error);
          throw error;
        }

        pubSubInstance = new RedisPubSub({ publisher, subscriber });
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
