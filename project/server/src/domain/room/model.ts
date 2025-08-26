import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Room {
  @Field()
  roomId: string;

  @Field(() => [String])
  participants: string[];
}

export type RoomPayload = { roomCreated: Room };
