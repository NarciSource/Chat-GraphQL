import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import IRepository from './interface';

@Injectable()
export class RedisRepository implements IRepository {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  // key helpers
  private userIndexKey() {
    return 'users';
  }

  private userKey(userId: string) {
    return `user:${userId}:rooms`;
  }

  private roomKey(roomId: string) {
    return `room:${roomId}:users`;
  }

  // user
  async setUser(userId: string) {
    // 유저 인덱스에 등록
    await this.redis.sAdd(this.userIndexKey(), userId);
  }

  async hasUser(userId: string) {
    return (await this.redis.sIsMember(this.userIndexKey(), userId)) === 1;
  }

  async getUsers(): Promise<string[]> {
    return await this.redis.sMembers(this.userIndexKey());
  }

  async removeUser(userId: string) {
    const userKey = this.userKey(userId);
    const rooms = await this.redis.sMembers(userKey);

    // 참여한 모든 방에서 유저 제거
    const multi = this.redis.multi();
    for (const roomId of rooms) {
      multi.sRem(this.roomKey(roomId), userId);
    }

    // 유저의 방 Set 삭제
    multi.del(userKey);

    // 유저 인덱스에서도 제거
    multi.sRem(this.userIndexKey(), userId);

    await multi.exec();
  }

  async getRoomsByUser(userId: string) {
    return this.redis.sMembers(this.userKey(userId));
  }

  //room
  async getRooms() {
    const keys = await this.scanKeys('room:*:users');

    return keys.map((k) => k.split(':')[1]);
  }

  async removeRoom(roomId: string) {
    const roomKey = this.roomKey(roomId);
    const members = await this.redis.sMembers(roomKey);
    {
      const multi = this.redis.multi();
      for (const userId of members) {
        multi.sRem(this.userKey(userId), roomId);
      }
      multi.del(roomKey);

      await multi.exec();
    }
  }

  // user-room
  async getRoomMembers(roomId: string) {
    return await this.redis.sMembers(this.roomKey(roomId));
  }

  async addRoomToUser(userId: string, roomId: string) {
    const userKey = this.userKey(userId);
    const roomKey = this.roomKey(roomId);
    {
      const multi = this.redis.multi();
      multi.sAdd(userKey, roomId); // 유저가 참여한 방
      multi.sAdd(roomKey, userId); // 방에 참여한 유저

      multi.sAdd(this.userIndexKey(), userId); // 유저 인덱스 보장
      await multi.exec();
    }
  }

  async removeRoomToUser(userId: string, roomId: string) {
    const userKey = this.userKey(userId);
    const roomKey = this.roomKey(roomId);
    {
      const multi = this.redis.multi();
      multi.sRem(userKey, roomId);
      multi.sRem(roomKey, userId);

      // 방이 비게 되면 방 Set 삭제
      const roomCard = await this.redis.sCard(roomKey);
      if (roomCard === 1) {
        multi.del(roomKey);
      }

      await multi.exec();
    }
  }

  // Redis SCAN helper
  private async scanKeys(pattern: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0';

    do {
      const { cursor: nextCursor, keys: batch } = await this.redis.scan(cursor, {
        MATCH: pattern,
        COUNT: 100,
      });
      keys.push(...batch);

      cursor = nextCursor;
    } while (cursor !== '0');

    return keys;
  }
}
