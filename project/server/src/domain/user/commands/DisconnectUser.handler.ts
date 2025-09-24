import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import DisconnectUserCommand from './DisconnectUser.command';

@CommandHandler(DisconnectUserCommand)
export default class DisconnectUserHandler implements ICommandHandler<DisconnectUserCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ sessionId }: DisconnectUserCommand) {
    await this.repository.removeSession(sessionId);
  }
}
