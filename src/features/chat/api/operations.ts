import * as SchemaTypes from '@/shared/api/types';

export type SendMessageMutationVariables = SchemaTypes.Exact<{
  roomId: SchemaTypes.Scalars['String']['input'];
  userId: SchemaTypes.Scalars['String']['input'];
  content: SchemaTypes.Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', message: boolean };

export type SendTypingMutationVariables = SchemaTypes.Exact<{
  roomId: SchemaTypes.Scalars['String']['input'];
  userId: SchemaTypes.Scalars['String']['input'];
}>;


export type SendTypingMutation = { __typename?: 'Mutation', typing: boolean };

export type OnTypingSubscriptionVariables = SchemaTypes.Exact<{
  roomId: SchemaTypes.Scalars['String']['input'];
}>;


export type OnTypingSubscription = { __typename?: 'Subscription', typing: { __typename?: 'Message', userId: string, roomId: string } };

export type ReceiveMessageSubscriptionVariables = SchemaTypes.Exact<{
  userId: SchemaTypes.Scalars['String']['input'];
}>;


export type ReceiveMessageSubscription = { __typename?: 'Subscription', message: { __typename?: 'Message', roomId: string, userId: string, content?: string | null } };

export type SystemSubscriptionVariables = SchemaTypes.Exact<{
  input: SchemaTypes.SystemInput;
}>;


export type SystemSubscription = { __typename?: 'Subscription', system: { __typename?: 'Message', roomId: string, userId: string, content?: string | null } };
