import { Message } from 'src/model/schemaDefinition';

export default interface IRepository {
  setUser(userId: string, sessionId: string): Promise<void>; // 유저-세션 등록
  hasUser(userId: string): Promise<boolean>; // 유저 존재 여부 확인
  getUsers(): Promise<string[]>; // 전체 유저 목록을 가져옴
  removeUser(userId: string): Promise<void>; // 유저 삭제
  removeSession(sessionKey: string): Promise<void>; // 세션 삭제

  getRooms(): Promise<string[]>; // 전체 방 목록을 가져옴
  removeRoom(roomId: string): Promise<void>; // 방 삭제
  getRoomsByUser(userId: string): Promise<string[]>; // 유저의 방 목록을 가져옴

  getRoomMembers(roomId: string): Promise<string[]>; // 방의 멤버 목록을 가져옴
  addRoomToMember(roomId: string, userId: string): Promise<void>; // 방에 유저 추가
  removeRoomToMember(userId: string, roomId: string): Promise<void>; // 방에서 유저 제거

  getMessageHistory(roomId: string): Promise<Message[]>; // 메시지 기록 불러오기
}
