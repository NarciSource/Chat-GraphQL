/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

import IRepository from './interface';

@Injectable()
export default class InMemoryRepository implements IRepository {
  private userSessions: { [Key: string]: string } = {};
  private userRoomsMap: Map<string, Set<string>> = new Map();
  private roomMembersMap: Map<string, Set<string>> = new Map();

  private ensureUser(userId: string) {
    if (!this.userRoomsMap.has(userId)) {
      this.userRoomsMap.set(userId, new Set());
    }
  }

  private ensureRoom(roomId: string) {
    if (!this.roomMembersMap.has(roomId)) {
      this.roomMembersMap.set(roomId, new Set());
    }
  }

  // user
  async setUser(userId: string, sessionKey: string) {
    this.userSessions[userId] = sessionKey;
  }

  async hasUser(userId: string) {
    return !!this.userSessions[userId];
  }

  async getUsers() {
    return Object.keys(this.userSessions);
  }

  async removeUser(userId: string) {
    const rooms = this.userRoomsMap.get(userId);
    if (!rooms) return;

    for (const roomId of rooms) {
      this.roomMembersMap.get(roomId)?.delete(userId);
    }

    this.userRoomsMap.delete(userId);
    delete this.userSessions[userId];
  }

  async removeSession(sessionKey: string) {
    let targetUserId: string | null = null;

    for (const [userId, storedKey] of Object.entries(this.userSessions)) {
      if (storedKey === sessionKey) {
        targetUserId = userId;
        break;
      }
    }
    delete this.userSessions[targetUserId];
  }

  // room
  async getRooms() {
    return [...this.roomMembersMap.keys()];
  }

  async removeRoom(roomId: string) {
    const members = this.roomMembersMap.get(roomId);
    if (!members) return;

    for (const userId of members) {
      this.userRoomsMap.get(userId)?.delete(roomId);
    }

    this.roomMembersMap.delete(roomId);
  }

  async getRoomsByUser(userId: string) {
    return [...(this.userRoomsMap.get(userId) ?? [])];
  }

  // room-member
  async getRoomMembers(roomId: string) {
    return [...(this.roomMembersMap.get(roomId) ?? [])];
  }

  async addRoomToMember(userId: string, roomId: string) {
    this.ensureUser(userId);
    this.ensureRoom(roomId);

    this.userRoomsMap.get(userId)?.add(roomId);
    this.roomMembersMap.get(roomId)?.add(userId);
  }

  async removeRoomToMember(userId: string, roomId: string) {
    this.userRoomsMap.get(userId)?.delete(roomId);
    this.roomMembersMap.get(roomId)?.delete(userId);

    if ((this.roomMembersMap.get(roomId)?.size ?? 0) === 0) {
      this.roomMembersMap.delete(roomId);
    }
  }

  async getMessageHistory(_roomId: string) {
    return [];
  }

  async searchByKeyword(userId: string, keyword: string) {
    return [];
  }
}
