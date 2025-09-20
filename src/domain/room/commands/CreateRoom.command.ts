import { Command } from '@nestjs/cqrs';

export default class CreateRoomCommand extends Command<{ roomId: string }> {
  constructor(
    public readonly hostId: string,
    public readonly participants: string[],
  ) {
    super();
  }
}
