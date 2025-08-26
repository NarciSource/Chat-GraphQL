import * as SchemaTypes from '@/shared/api/types';

export type CreateRoomMutationVariables = SchemaTypes.Exact<{
  hostId: SchemaTypes.Scalars['String']['input'];
  participants: Array<SchemaTypes.Scalars['String']['input']> | SchemaTypes.Scalars['String']['input'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: string };

export type JoinRoomMutationVariables = SchemaTypes.Exact<{
  roomId: SchemaTypes.Scalars['String']['input'];
  userId: SchemaTypes.Scalars['String']['input'];
}>;


export type JoinRoomMutation = { __typename?: 'Mutation', joinRoom: boolean };

export type LeaveRoomMutationVariables = SchemaTypes.Exact<{
  roomId: SchemaTypes.Scalars['String']['input'];
  userId: SchemaTypes.Scalars['String']['input'];
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: boolean };

export type RoomCreatedSubscriptionVariables = SchemaTypes.Exact<{
  userId: SchemaTypes.Scalars['String']['input'];
}>;


export type RoomCreatedSubscription = { __typename?: 'Subscription', roomCreated: { __typename?: 'Room', participants: Array<string>, roomId: string } };
