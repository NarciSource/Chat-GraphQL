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
  private userKey(userId: string) {
    return `user:${userId}:rooms`;
  }

  private roomKey(roomId: string) {
    return `room:${roomId}:users`;
  }

  // user
  async setUser(userId: string) {
    await this.redis.exists(this.userKey(userId));
  }

  async hasUser(userId: string) {
    return (await this.redis.exists(this.userKey(userId))) === 1;
  }

  async getUsers() {
    const keys = await this.scanKeys('user:*:rooms');

    return keys.map((k) => k.split(':')[1]);
  }

  async removeUser(userId: string) {
    const userKey = this.userKey(userId);
    const rooms = await this.redis.sMembers(userKey);

    for (const roomId of rooms) {
      await this.redis.sRem(this.roomKey(roomId), userId);
    }

    await this.redis.del(userKey);
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
      multi.sAdd(userKey, roomId);
      multi.sAdd(roomKey, userId);

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

      if ((await this.redis.sCard(roomKey)) === 1) {
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
