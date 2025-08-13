import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { UserGateway } from 'src/domain/user/gateway';

@WebSocketGateway({
  path: '/chat/ws',
  namespace: '/chat',
  cors: {
    origin: '*', // 실제 배포 시에는 허용할 도메인을 명시
  },
})
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userGateway: UserGateway) {}

  afterInit() {
    this.userGateway.server = this.server;

    console.log('소켓 서버 초기화 완료');
  }

  // 소켓 연결 시
  handleConnection(socket: Socket) {
    console.log('클라이언트 연결:', socket.id);
  }

  // 소켓 연결 해제 시
  async handleDisconnect(socket: Socket) {
    await this.userGateway.handleUserDisconnected(socket);

    console.log('클라이언트 연결 해제:', socket.id);
  }

  // user
  @SubscribeMessage('register')
  async handleRegister(socket: Socket, payload: { userId: string }) {
    return this.userGateway.handleRegister(socket, payload);
  }
}
