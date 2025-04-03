import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';

@Module({
  providers: [
    ChatGateway,
    ChatService,
    {
      provide: 'IChatRepository',
      useClass: ChatRepository,
    },
  ],
  exports: ['IChatRepository'],
})
export class ChatModule {}
