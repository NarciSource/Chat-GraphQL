import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { PubSubPublishEvent } from 'src/domain/shared/events';
import { SystemPayload } from 'src/domain/chat/model';
import { RoomPayload } from '../model';
import CreateRoomCommand from './CreateRoom.command';

@CommandHandler(CreateRoomCommand)
export default class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ hostId, participants }: CreateRoomCommand) {
    const roomId = this.generateRandomRoomId();
    const members = [...participants, hostId];

    // 레포지토리 로직
    for (const userId of members) {
      await this.repository.addRoomToMember(userId, roomId);
    }

    // 이벤트 발행
    const roomCreatedEvent = new PubSubPublishEvent<RoomPayload>('roomCreated', {
      roomCreated: { roomId, participants: members },
    });
    const systemEvent = new PubSubPublishEvent<SystemPayload>('system', {
      system: { roomId, userId: hostId, content: `유저 ${hostId}가 방을 생성했습니다.` },
    });
    await this.eventBus.publishAll([roomCreatedEvent, systemEvent]);

    return { roomId };
  }

  // 랜덤 roomId
  generateRandomRoomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
