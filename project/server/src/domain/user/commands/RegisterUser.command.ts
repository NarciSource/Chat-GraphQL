import { Command } from '@nestjs/cqrs';

export default class RegisterUserCommand extends Command<boolean> {
  constructor(
    public readonly userId: string,
    public readonly sessionKey: string,
  ) {
    super();
  }
}
