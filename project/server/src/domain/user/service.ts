import { Injectable, Inject } from '@nestjs/common';

import IRepository from 'src/repository/interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  // 등록 로직
  async registerUser(userId: string): Promise<boolean> {
    const has = await this.repository.hasUser(userId);

    if (has) {
      return false; // 중복
    }

    await this.repository.setUser(userId);

    return true;
  }

  // 유저 해제 로직
  async disconnectUser(userId: string): Promise<void> {
    const has = await this.repository.hasUser(userId);

    if (!has) return;

    await this.repository.removeUser(userId);
  }

  getUsers() {
    return this.repository.getUsers();
  }
}
