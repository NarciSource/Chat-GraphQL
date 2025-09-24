import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import RegisterUserCommand from './RegisterUser.command';

@CommandHandler(RegisterUserCommand)
export default class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, sessionKey }: RegisterUserCommand) {
    const has = await this.repository.hasUser(userId);

    if (has) {
      return false; // 중복
    }

    await this.repository.setUser(userId, sessionKey);

    return true;
  }
}
