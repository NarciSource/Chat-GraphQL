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

export type SendMessageMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', message: boolean };

export type SendTypingMutationVariables = Exact<{
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type SendTypingMutation = { __typename?: 'Mutation', typing: boolean };

export type OnTypingSubscriptionVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type OnTypingSubscription = { __typename?: 'Subscription', typing: { __typename?: 'Message', userId: string, roomId: string } };

export type ReceiveMessageSubscriptionVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type ReceiveMessageSubscription = { __typename?: 'Subscription', message: { __typename?: 'Message', userId: string, content?: string | null } };

export type SystemSubscriptionVariables = Exact<{
  input: SystemInput;
}>;


export type SystemSubscription = { __typename?: 'Subscription', system: { __typename?: 'Message', roomId: string, userId: string, content?: string | null } };


export const SendMessageDocument = gql`
    mutation sendMessage($roomId: String!, $userId: String!, $content: String!) {
  message(roomId: $roomId, userId: $userId, content: $content)
}
    `;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSendMessageMutation({
 *   variables: {
 *     roomId: // value for 'roomId'
 *     userId: // value for 'userId'
 *     content: // value for 'content'
 *   },
 * });
 */
export function useSendMessageMutation(options: VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
}
export type SendMessageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SendMessageMutation, SendMessageMutationVariables>;
export const SendTypingDocument = gql`
    mutation sendTyping($roomId: String!, $userId: String!) {
  typing(roomId: $roomId, userId: $userId)
}
    `;

/**
 * __useSendTypingMutation__
 *
 * To run a mutation, you first call `useSendTypingMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSendTypingMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSendTypingMutation({
 *   variables: {
 *     roomId: // value for 'roomId'
 *     userId: // value for 'userId'
 *   },
 * });
 */
export function useSendTypingMutation(options: VueApolloComposable.UseMutationOptions<SendTypingMutation, SendTypingMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SendTypingMutation, SendTypingMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<SendTypingMutation, SendTypingMutationVariables>(SendTypingDocument, options);
}
export type SendTypingMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SendTypingMutation, SendTypingMutationVariables>;
export const OnTypingDocument = gql`
    subscription onTyping($roomId: String!) {
  typing(roomId: $roomId) {
    userId
    roomId
  }
}
    `;

/**
 * __useOnTypingSubscription__
 *
 * To run a query within a Vue component, call `useOnTypingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnTypingSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useOnTypingSubscription({
 *   roomId: // value for 'roomId'
 * });
 */
export function useOnTypingSubscription(variables: OnTypingSubscriptionVariables | VueCompositionApi.Ref<OnTypingSubscriptionVariables> | ReactiveFunction<OnTypingSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<OnTypingSubscription, OnTypingSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<OnTypingSubscription, OnTypingSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<OnTypingSubscription, OnTypingSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<OnTypingSubscription, OnTypingSubscriptionVariables>(OnTypingDocument, variables, options);
}
export type OnTypingSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<OnTypingSubscription, OnTypingSubscriptionVariables>;
export const ReceiveMessageDocument = gql`
    subscription receiveMessage($roomId: String!) {
  message(roomId: $roomId) {
    userId
    content
  }
}
    `;

/**
 * __useReceiveMessageSubscription__
 *
 * To run a query within a Vue component, call `useReceiveMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useReceiveMessageSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useReceiveMessageSubscription({
 *   roomId: // value for 'roomId'
 * });
 */
export function useReceiveMessageSubscription(variables: ReceiveMessageSubscriptionVariables | VueCompositionApi.Ref<ReceiveMessageSubscriptionVariables> | ReactiveFunction<ReceiveMessageSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<ReceiveMessageSubscription, ReceiveMessageSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<ReceiveMessageSubscription, ReceiveMessageSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<ReceiveMessageSubscription, ReceiveMessageSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<ReceiveMessageSubscription, ReceiveMessageSubscriptionVariables>(ReceiveMessageDocument, variables, options);
}
export type ReceiveMessageSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<ReceiveMessageSubscription, ReceiveMessageSubscriptionVariables>;
export const SystemDocument = gql`
    subscription System($input: SystemInput!) {
  system(input: $input) {
    roomId
    userId
    content
  }
}
    `;

/**
 * __useSystemSubscription__
 *
 * To run a query within a Vue component, call `useSystemSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSystemSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useSystemSubscription({
 *   input: // value for 'input'
 * });
 */
export function useSystemSubscription(variables: SystemSubscriptionVariables | VueCompositionApi.Ref<SystemSubscriptionVariables> | ReactiveFunction<SystemSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<SystemSubscription, SystemSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<SystemSubscription, SystemSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<SystemSubscription, SystemSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<SystemSubscription, SystemSubscriptionVariables>(SystemDocument, variables, options);
}
export type SystemSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<SystemSubscription, SystemSubscriptionVariables>;