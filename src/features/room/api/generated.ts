/* eslint-disable */
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']['output']>;
  roomId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Scalars['String']['output'];
  joinRoom: Scalars['Boolean']['output'];
  leaveRoom: Scalars['Boolean']['output'];
  message: Scalars['Boolean']['output'];
  typing: Scalars['Boolean']['output'];
};


export type MutationCreateRoomArgs = {
  hostId: Scalars['String']['input'];
  participants: Array<Scalars['String']['input']>;
};


export type MutationJoinRoomArgs = {
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationLeaveRoomArgs = {
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationMessageArgs = {
  content: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationTypingArgs = {
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  _empty: Scalars['String']['output'];
};

export type Room = {
  __typename?: 'Room';
  participants: Array<Scalars['String']['output']>;
  roomId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  message: Message;
  roomCreated: Room;
  system: Message;
  typing: Message;
};


export type SubscriptionMessageArgs = {
  roomId: Scalars['String']['input'];
};


export type SubscriptionRoomCreatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionSystemArgs = {
  input: SystemInput;
};


export type SubscriptionTypingArgs = {
  roomId: Scalars['String']['input'];
};

export type SystemInput = {
  roomId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRoomMutationVariables = Exact<{
  hostId: Scalars['String']['input'];
  participants: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: string };

export type JoinRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type JoinRoomMutation = { __typename?: 'Mutation', joinRoom: boolean };

export type LeaveRoomMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: boolean };

export type RoomCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type RoomCreatedSubscription = { __typename?: 'Subscription', roomCreated: { __typename?: 'Room', participants: Array<string>, roomId: string } };


export const CreateRoomDocument = gql`
    mutation createRoom($hostId: String!, $participants: [String!]!) {
  createRoom(hostId: $hostId, participants: $participants)
}
    `;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateRoomMutation({
 *   variables: {
 *     hostId: // value for 'hostId'
 *     participants: // value for 'participants'
 *   },
 * });
 */
export function useCreateRoomMutation(options: VueApolloComposable.UseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
}
export type CreateRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateRoomMutation, CreateRoomMutationVariables>;
export const JoinRoomDocument = gql`
    mutation joinRoom($roomId: String!, $userId: String!) {
  joinRoom(roomId: $roomId, userId: $userId)
}
    `;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useJoinRoomMutation({
 *   variables: {
 *     roomId: // value for 'roomId'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useJoinRoomMutation(options: VueApolloComposable.UseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, options);
}
export type JoinRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<JoinRoomMutation, JoinRoomMutationVariables>;
export const LeaveRoomDocument = gql`
    mutation leaveRoom($roomId: String!, $userId: String!) {
  leaveRoom(roomId: $roomId, userId: $userId)
}
    `;

/**
 * __useLeaveRoomMutation__
 *
 * To run a mutation, you first call `useLeaveRoomMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLeaveRoomMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLeaveRoomMutation({
 *   variables: {
 *     roomId: // value for 'roomId'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useLeaveRoomMutation(options: VueApolloComposable.UseMutationOptions<LeaveRoomMutation, LeaveRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LeaveRoomMutation, LeaveRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument, options);
}
export type LeaveRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LeaveRoomMutation, LeaveRoomMutationVariables>;
export const RoomCreatedDocument = gql`
    subscription roomCreated($userId: String!) {
  roomCreated(userId: $userId) {
    participants
    roomId
  }
}
    `;

/**
 * __useRoomCreatedSubscription__
 *
 * To run a query within a Vue component, call `useRoomCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomCreatedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useRoomCreatedSubscription({
 *   userId: // value for 'userId'
 * });
 */
export function useRoomCreatedSubscription(variables: RoomCreatedSubscriptionVariables | VueCompositionApi.Ref<RoomCreatedSubscriptionVariables> | ReactiveFunction<RoomCreatedSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<RoomCreatedSubscription, RoomCreatedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>(RoomCreatedDocument, variables, options);
}
export type RoomCreatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>;