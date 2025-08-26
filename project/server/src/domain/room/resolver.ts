import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { Room, RoomPayload } from './model';
import { RoomService } from './service';

@Resolver()
export class RoomResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
    private readonly service: RoomService,
  ) {}

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

    await this.pubSub.publish('system', {
      system: { roomId, userId: hostId, content: `유저 ${hostId}가 방을 생성했습니다.` },
    });

    return roomId;
  }

  @Mutation(() => Boolean, { name: 'joinRoom' })
  async joinRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const { success, participants } = await this.service.joinRoom(userId, roomId);

    if (success) {
      // 생성된 roomId를 모든 room 참가자에게 알림
      await this.pubSub.publish<RoomPayload>('roomCreated', {
        roomCreated: { roomId, participants },
      });

      await this.pubSub.publish('system', {
        system: { roomId, userId, content: `유저 ${userId}가 방에 참여했습니다.` },
      });

      console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);
    }

    return success;
  }

  @Mutation(() => Boolean, { name: 'leaveRoom' })
  async leaveRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const success = await this.service.leaveRoom(userId, roomId);

    if (success) {
      await this.pubSub.publish('system', {
        system: { roomId, userId, content: `유저 ${userId}가 방에서 떠났습니다.` },
      });

      console.log(`유저 ${userId}가 방 ${roomId}에서 떠났습니다.`);
    }

    return success;
  }

  // subscriptions
  @Subscription(() => Room, {
    name: 'roomCreated',
    filter: (payload: RoomPayload, { userId }: { userId: string }) =>
      payload.roomCreated.participants.includes(userId),
  })
  roomCreated(@Args('userId') userId: string) {
    return this.pubSub.asyncIterator<RoomPayload>('roomCreated');
  }
}
