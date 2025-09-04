import { Module } from '@nestjs/common';

import ChatResolver from './resolver';

@Module({
  providers: [ChatResolver],
})
export default class ChatModule {}
