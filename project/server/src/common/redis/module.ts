import { Global, Module } from '@nestjs/common';

import {
  redisStorageProvider,
  redisPubSubProvider,
  redisStreamsProvider,
  REDIS_PUBSUB,
  REDIS_STORAGE,
  REDIS_STREAMS,
} from './providers';

@Global()
@Module({
  providers: [redisStorageProvider, redisPubSubProvider, redisStreamsProvider],
  exports: [REDIS_STORAGE, REDIS_PUBSUB, REDIS_STREAMS],
})
export default class RedisModule {}
