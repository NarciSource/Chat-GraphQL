import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { PubSubPublishEvent } from 'src/domain/shared/events';
import { SystemPayload } from 'src/domain/chat/model';
import LeaveRoomCommand from './LeaveRoom.command';

@CommandHandler(LeaveRoomCommand)
export default class LeaveRoomHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: LeaveRoomCommand) {
    // 레포지토리 로직
    await this.repository.removeRoomToMember(userId, roomId);

    const members = await this.repository.getRoomMembers(roomId);

    if (members.length) {
      // 이벤트 발행
      const systemEvent = new PubSubPublishEvent<SystemPayload>('system', {
        system: { roomId, userId, content: `유저 ${userId}가 방에서 떠났습니다.` },
      });
      this.eventBus.publish(systemEvent);
    }

    return !!members;
  }
}
