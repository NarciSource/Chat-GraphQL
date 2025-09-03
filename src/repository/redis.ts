import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import IRepository from './interface';

@Injectable()
export class RedisRepository implements IRepository {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  // Key Helpers
  private userSessionKey(userId: string) {
    return `user:${userId}:session`;
  }

  private userKey(userId: string) {
    return `user:${userId}:rooms`;
  }

  private roomKey(roomId: string) {
    return `room:${roomId}:users`;
  }

  // user
  async setUser(userId: string, sessionKey: string) {
    const userSessionKey = this.userSessionKey(userId);

    await this.redis.set(userSessionKey, sessionKey);
  }

  async hasUser(userId: string): Promise<boolean> {
    const userSessionKey = this.userSessionKey(userId);

    return (await this.redis.exists(userSessionKey)) === 1;
  }

  async getUsers(): Promise<string[]> {
    const keys = await this.scanKeys('user:*:session');
    return keys.map((key) => key.split(':')[1]);
  }

  async removeUser(userId: string) {
    const userRoomsKey = this.userKey(userId);
    const sessionKey = this.userSessionKey(userId);
    const rooms = await this.redis.sMembers(userRoomsKey);

    {
      // 참여한 모든 방에서 유저 제거
      const multi = this.redis.multi();
      for (const roomId of rooms) {
        multi.sRem(this.roomKey(roomId), userId);
      }

      // 유저의 방 Set 삭제
      multi.del(userRoomsKey);
      // 유저의 세션 삭제
      multi.del(sessionKey);

      await multi.exec();
    }
  }

  async removeSession(sessionKey: string) {
    // 모든 user:{userId}:session 키 조회
    const sessionKeys = await this.scanKeys('user:*:session');

    let targetUserId: string | null = null;

    for (const key of sessionKeys) {
      const storedSessionId = await this.redis.get(key);
      if (storedSessionId === sessionKey) {
        // key = user:{userId}:session → userId 추출
        targetUserId = key.split(':')[1];
        break;
      }
    }

    await this.removeUser(targetUserId); // 기존 로직으로 유저 삭제
  }

  async getRoomsByUser(userId: string) {
    return this.redis.sMembers(this.userKey(userId));
  }

  // room
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

  // User-Room relation
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
