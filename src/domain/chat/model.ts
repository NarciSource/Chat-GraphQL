import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  userId: string;

  @Field()
  roomId: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}

@InputType()
export class SystemInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  roomId?: string;
}

export type MessagePayload = { message: Message; participants: string[] };
export type SystemPayload = { system: Message };
export type TypingPayload = { typing: Message };
