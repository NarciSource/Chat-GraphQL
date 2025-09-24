import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default {
  provide: 'REDIS_PUBSUB',
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
};

// 공용 PubSub 인스턴스
let pubSubInstance: RedisPubSub;
export const getPubSubInstance = () => pubSubInstance;
