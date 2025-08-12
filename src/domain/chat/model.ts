import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field()
  userId: string;

  @Field()
  roomId: string;

  @Field({ nullable: true })
  content?: string;
}
