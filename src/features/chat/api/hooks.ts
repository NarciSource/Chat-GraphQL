import * as Ops from './operations';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

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
export function useSendMessageMutation(options: VueApolloComposable.UseMutationOptions<Ops.SendMessageMutation, Ops.SendMessageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.SendMessageMutation, Ops.SendMessageMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.SendMessageMutation, Ops.SendMessageMutationVariables>(SendMessageDocument, options);
}
export type SendMessageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.SendMessageMutation, Ops.SendMessageMutationVariables>;
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
export function useSendTypingMutation(options: VueApolloComposable.UseMutationOptions<Ops.SendTypingMutation, Ops.SendTypingMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.SendTypingMutation, Ops.SendTypingMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.SendTypingMutation, Ops.SendTypingMutationVariables>(SendTypingDocument, options);
}
export type SendTypingMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.SendTypingMutation, Ops.SendTypingMutationVariables>;
export const GetHistoryDocument = gql`
    query getHistory($roomId: String!) {
  history(roomId: $roomId) {
    userId
    content
    createdAt
  }
}
    `;

/**
 * __useGetHistoryQuery__
 *
 * To run a query within a Vue component, call `useGetHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHistoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetHistoryQuery({
 *   roomId: // value for 'roomId'
 * });
 */
export function useGetHistoryQuery(variables: Ops.GetHistoryQueryVariables | VueCompositionApi.Ref<Ops.GetHistoryQueryVariables> | ReactiveFunction<Ops.GetHistoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>(GetHistoryDocument, variables, options);
}
export function useGetHistoryLazyQuery(variables?: Ops.GetHistoryQueryVariables | VueCompositionApi.Ref<Ops.GetHistoryQueryVariables> | ReactiveFunction<Ops.GetHistoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>(GetHistoryDocument, variables, options);
}
export type GetHistoryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<Ops.GetHistoryQuery, Ops.GetHistoryQueryVariables>;
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
export function useOnTypingSubscription(variables: Ops.OnTypingSubscriptionVariables | VueCompositionApi.Ref<Ops.OnTypingSubscriptionVariables> | ReactiveFunction<Ops.OnTypingSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<Ops.OnTypingSubscription, Ops.OnTypingSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<Ops.OnTypingSubscription, Ops.OnTypingSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<Ops.OnTypingSubscription, Ops.OnTypingSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<Ops.OnTypingSubscription, Ops.OnTypingSubscriptionVariables>(OnTypingDocument, variables, options);
}
export type OnTypingSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<Ops.OnTypingSubscription, Ops.OnTypingSubscriptionVariables>;
export const ReceiveMessageDocument = gql`
    subscription receiveMessage($userId: String!) {
  message(userId: $userId) {
    roomId
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
 *   userId: // value for 'userId'
 * });
 */
export function useReceiveMessageSubscription(variables: Ops.ReceiveMessageSubscriptionVariables | VueCompositionApi.Ref<Ops.ReceiveMessageSubscriptionVariables> | ReactiveFunction<Ops.ReceiveMessageSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<Ops.ReceiveMessageSubscription, Ops.ReceiveMessageSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<Ops.ReceiveMessageSubscription, Ops.ReceiveMessageSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<Ops.ReceiveMessageSubscription, Ops.ReceiveMessageSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<Ops.ReceiveMessageSubscription, Ops.ReceiveMessageSubscriptionVariables>(ReceiveMessageDocument, variables, options);
}
export type ReceiveMessageSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<Ops.ReceiveMessageSubscription, Ops.ReceiveMessageSubscriptionVariables>;
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
export function useSystemSubscription(variables: Ops.SystemSubscriptionVariables | VueCompositionApi.Ref<Ops.SystemSubscriptionVariables> | ReactiveFunction<Ops.SystemSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<Ops.SystemSubscription, Ops.SystemSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<Ops.SystemSubscription, Ops.SystemSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<Ops.SystemSubscription, Ops.SystemSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<Ops.SystemSubscription, Ops.SystemSubscriptionVariables>(SystemDocument, variables, options);
}
export type SystemSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<Ops.SystemSubscription, Ops.SystemSubscriptionVariables>;