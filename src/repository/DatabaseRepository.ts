import { Inject, Injectable } from '@nestjs/common';

import IRepository from './interface';
import Redis from 'ioredis';

@Injectable()
export default class DatabaseRepository implements IRepository {
  constructor(
    @Inject('REDIS_STORAGE')
    private readonly redis: Redis,
  ) {}

  // Key Helpers
  private usersHashKey = () => 'users'; // userId → sessionKey

  private userRoomsKey = (userId: string) => `user:${userId}:rooms`;

  private roomMembersKey = (roomId: string) => `room:${roomId}:members`;

  // user
  async setUser(userId: string, sessionKey: string) {
    await this.redis.hset(this.usersHashKey(), userId, sessionKey);
  }

  async hasUser(userId: string): Promise<boolean> {
    return (await this.redis.hexists(this.usersHashKey(), userId)) === 1;
  }

  async getUsers(): Promise<string[]> {
    return await this.redis.hkeys(this.usersHashKey());
  }

  async removeUser(userId: string) {
    const userRoomsKey = this.userRoomsKey(userId);
    const sessionKey = this.usersHashKey();
    const roomIds = await this.redis.smembers(userRoomsKey);

    {
      // 참여한 모든 방에서 유저 제거
      const multi = this.redis.multi();
      for (const roomId of roomIds) {
        multi.srem(this.roomMembersKey(roomId), userId);
      }

      // 유저의 방 Set 삭제
      multi.del(userRoomsKey);
      // 유저의 세션 삭제
      multi.hdel(sessionKey, userId);

      await multi.exec();
    }
  }

  async removeSession(sessionKey: string) {
    const userIds = await this.getUsers();

    let targetId: string | null = null;

    for (const userId of userIds) {
      const storedSessionId = await this.redis.hget(this.usersHashKey(), userId);
      if (storedSessionId === sessionKey) {
        targetId = userId;
        break;
      }
    }

    await this.removeUser(targetId); // 기존 로직으로 유저 삭제
  }

  // room
  async getRooms() {
    const keys = await this.scanKeys('room:*:users');

    return keys.map((k) => k.split(':')[1]);
  }

  async removeRoom(roomId: string) {
    const roomMembersKey = this.roomMembersKey(roomId);
    const memberIds = await this.redis.smembers(roomMembersKey);
    {
      const multi = this.redis.multi();
      for (const memberId of memberIds) {
        multi.srem(this.userRoomsKey(memberId), roomId);
      }
      multi.del(roomMembersKey);

      await multi.exec();
    }
  }

  async getRoomsByUser(userId: string) {
    return await this.redis.smembers(this.userRoomsKey(userId));
  }

  // room-member
  async getRoomMembers(roomId: string) {
    return await this.redis.smembers(this.roomMembersKey(roomId));
  }

  async addRoomToMember(memberId: string, roomId: string) {
    const userRoomsKey = this.userRoomsKey(memberId);
    const roomMembersKey = this.roomMembersKey(roomId);
    {
      const multi = this.redis.multi();
      multi.sadd(userRoomsKey, roomId); // 유저가 참여한 방
      multi.sadd(roomMembersKey, memberId); // 방에 참여한 유저

      await multi.exec();
    }
  }

  async removeRoomToMember(memberId: string, roomId: string) {
    const userRomsKey = this.userRoomsKey(memberId);
    const roomMembersKey = this.roomMembersKey(roomId);
    {
      const multi = this.redis.multi();
      multi.srem(userRomsKey, roomId);
      multi.srem(roomMembersKey, memberId);

      // 방이 비게 되면 방 Set 삭제
      const roomCard = await this.redis.scard(roomMembersKey);
      if (roomCard === 0) {
        multi.del(roomMembersKey);
      }

      await multi.exec();
    }
  }

  // Redis SCAN helper
  private async scanKeys(pattern: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0';

    do {
      const [nextCursor, batch] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      keys.push(...batch);

      cursor = nextCursor;
    } while (cursor !== '0');

    return keys;
  }
}
