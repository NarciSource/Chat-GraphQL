import { Command } from '@nestjs/cqrs';

export default class DisconnectUserCommand extends Command<void> {
  constructor(public readonly sessionId: string) {
    super();
  }
}
