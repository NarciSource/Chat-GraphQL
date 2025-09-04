import { Injectable, Inject } from '@nestjs/common';

import IRepository from 'src/repository/interface';

@Injectable()
export default class UserService {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  // 등록 로직
  async registerUser(userId: string, sessionKey: string): Promise<boolean> {
    const has = await this.repository.hasUser(userId);

    if (has) {
      return false; // 중복
    }

    await this.repository.setUser(userId, sessionKey);

    return true;
  }

  // 세션 해제 로직
  async disconnectSession(sessionId: string): Promise<void> {
    await this.repository.removeSession(sessionId);
  }

  getUsers() {
    return this.repository.getUsers();
  }
}
