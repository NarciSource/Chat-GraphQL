import { Inject, Injectable } from '@nestjs/common';

import IRepository from 'src/repository/interface';

@Injectable()
export default class ChatService {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async getPartitions(roomId: string) {
    return this.repository.getRoomMembers(roomId);
  }
}
