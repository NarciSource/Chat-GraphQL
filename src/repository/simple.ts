/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

import IRepository from './interface';

@Injectable()
export class SimpleRepository implements IRepository {
  private userSessionMap: Map<string, string> = new Map();
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
    this.userSessionMap.set(userId, sessionKey);
  }

  async hasUser(userId: string) {
    return this.userSessionMap.has(userId);
  }

  async getUsers() {
    return [...this.userSessionMap.keys()];
  }

  async removeUser(userId: string) {
    const rooms = this.userRoomsMap.get(userId);
    if (!rooms) return;

    for (const roomId of rooms) {
      this.roomMembersMap.get(roomId)?.delete(userId);
    }

    this.userRoomsMap.delete(userId);
    this.userSessionMap.delete(userId);
  }

  async removeSession(sessionKey: string) {
    for (const [userId, storedKey] of this.userSessionMap.entries()) {
      if (storedKey === sessionKey) {
        this.userSessionMap.delete(userId);
        break;
      }
    }
  }

  async getRoomsByUser(userId: string) {
    return [...(this.userRoomsMap.get(userId) ?? [])];
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

  async getRoomMembers(roomId: string) {
    return [...(this.roomMembersMap.get(roomId) ?? [])];
  }

  // user-room
  async addRoomToUser(userId: string, roomId: string) {
    this.ensureUser(userId);
    this.ensureRoom(roomId);

    this.userRoomsMap.get(userId)?.add(roomId);
    this.roomMembersMap.get(roomId)?.add(userId);
  }

  async removeRoomToUser(userId: string, roomId: string) {
    this.userRoomsMap.get(userId)?.delete(roomId);
    this.roomMembersMap.get(roomId)?.delete(userId);

    if ((this.roomMembersMap.get(roomId)?.size ?? 0) === 0) {
      this.roomMembersMap.delete(roomId);
    }
  }
}
