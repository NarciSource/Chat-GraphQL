import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { PubSubPublishEvent } from 'src/domain/shared/events';
import { SystemPayload } from 'src/domain/chat/model';
import { RoomPayload } from '../model';
import JoinRoomCommand from './JoinRoom.command';

@CommandHandler(JoinRoomCommand)
export default class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: JoinRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (members) {
      // 레포지토리 로직
      await this.repository.addRoomToMember(userId, roomId);

      // 이벤트 발행
      const roomCreatedEvent = new PubSubPublishEvent<RoomPayload>('roomCreated', {
        roomCreated: { roomId, participants: [...members, userId] },
      });
      const systemEvent = new PubSubPublishEvent<SystemPayload>('system', {
        system: { roomId, userId, content: `유저 ${userId}가 방에 참여했습니다.` },
      });

      await this.eventBus.publishAll([roomCreatedEvent, systemEvent]);
    }

    return !!members;
  }
}
