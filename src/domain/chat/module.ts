import { Module } from '@nestjs/common';

import ChatResolver from './resolver';
import ChatService from './service';

@Module({
  providers: [ChatResolver, ChatService],
})
export default class ChatModule {}
