import { Module } from '@nestjs/common';

import { ChatResolver } from './resolver';

@Module({
  imports: [],
  providers: [ChatResolver],
})
export class ChatModule {}
