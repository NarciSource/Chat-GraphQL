import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Room } from './model';
import { RoomService } from './service';

@Resolver()
export class RoomResolver {
  private pubSub = new PubSub();

  constructor(private readonly service: RoomService) {}

  // mutations
  @Mutation(() => String, { name: 'createRoom' })
  async createRoom(
    @Args('hostId') hostId: string,
    @Args({ name: 'participants', type: () => [String] })
    participants: string[],
  ) {
    const { roomId } = await this.service.createRoom(hostId, participants);

    await this.pubSub.publish('roomCreated', {
      roomCreated: { roomId, participants: [...participants, hostId] },
    });

    return roomId;
  }

  @Mutation(() => Boolean, { name: 'joinRoom' })
  async joinRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const { success, participants } = await this.service.joinRoom(userId, roomId);

    if (success) {
      // 생성된 roomId를 모든 room 참가자에게 알림
      await this.pubSub.publish('roomCreated', {
        roomCreated: { roomId, participants },
      });

      console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);
    }

    return success;
  }

  @Mutation(() => Boolean, { name: 'leaveRoom' })
  async leaveRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const success = await this.service.leaveRoom(userId, roomId);

    if (success) {
      console.log(`유저 ${userId}가 방 ${roomId}에서 떠났습니다.`);
    }

    return success;
  }

  // subscriptions
  @Subscription(() => Room, {
    name: 'roomCreated',
    filter: (payload: { roomCreated: Room }, { userId }: { userId: string }) =>
      payload.roomCreated.participants.includes(userId),
  })
  roomCreated(@Args('userId') userId: string) {
    return this.pubSub.asyncIterableIterator('roomCreated');
  }
}
