import { Global, Module } from '@nestjs/common';

import { redisStorageProvider, redisPubSubProvider, redisStreamsProvider } from './providers';

@Global()
@Module({
  providers: [redisStorageProvider, redisPubSubProvider, redisStreamsProvider],
  exports: ['REDIS_STORAGE', 'REDIS_PUBSUB', 'REDIS_STREAMS'],
})
export default class RedisModule {}
