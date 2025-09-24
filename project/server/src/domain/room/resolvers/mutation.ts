import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateRoomCommand, JoinRoomCommand, LeaveRoomCommand } from '../commands';

@Resolver()
export default class RoomMutationResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => String, { name: 'createRoom' })
  async createRoom(
    @Args('hostId') hostId: string,
    @Args({ name: 'participants', type: () => [String] })
    participants: string[],
  ) {
    const command = new CreateRoomCommand(hostId, participants);

    const { roomId } = await this.commandBus.execute(command);
    return roomId;
  }

  @Mutation(() => Boolean, { name: 'joinRoom' })
  async joinRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const command = new JoinRoomCommand(userId, roomId);

    const success = await this.commandBus.execute(command);
    return success;
  }

  @Mutation(() => Boolean, { name: 'leaveRoom' })
  async leaveRoom(@Args('roomId') roomId: string, @Args('userId') userId: string) {
    const command = new LeaveRoomCommand(userId, roomId);

    const success = await this.commandBus.execute(command);
    return success;
  }
}
