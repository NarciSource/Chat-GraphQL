import { Global, Module } from '@nestjs/common';

import dbProvider from './db.provider';
import pubsubProvider from './pubsub.provider';
import streamsProvider from './streams.provider';

@Global()
@Module({
  providers: [dbProvider, pubsubProvider, streamsProvider],
  exports: ['REDIS_CLIENT', 'PUB_SUB', 'REDIS_STREAMS'],
})
export default class RedisModule {}
