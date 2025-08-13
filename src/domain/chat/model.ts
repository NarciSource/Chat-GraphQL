import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  userId: string;

  @Field()
  roomId: string;

  @Field({ nullable: true })
  content?: string;
}

@InputType()
export class SystemInput {
  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  roomId?: string;
}
