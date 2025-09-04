import { Global, Module } from '@nestjs/common';

import dbProvider from './db.provider';
import pubsubProvider from './pubsub.provider';

@Global()
@Module({
  providers: [dbProvider, pubsubProvider],
  exports: ['REDIS_CLIENT', 'PUB_SUB'],
})
export default class RedisModule {}
