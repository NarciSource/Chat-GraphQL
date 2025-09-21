import { Global, Module } from '@nestjs/common';

import DynamoProvider from './provider';

@Global()
@Module({
  providers: [DynamoProvider],
  exports: ['DYNAMO_STORAGE'],
})
export default class DynamoModule {}
