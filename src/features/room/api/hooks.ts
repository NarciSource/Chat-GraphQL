import * as Ops from './operations';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

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
export function useCreateRoomMutation(options: VueApolloComposable.UseMutationOptions<Ops.CreateRoomMutation, Ops.CreateRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.CreateRoomMutation, Ops.CreateRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.CreateRoomMutation, Ops.CreateRoomMutationVariables>(CreateRoomDocument, options);
}
export type CreateRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.CreateRoomMutation, Ops.CreateRoomMutationVariables>;
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
export function useJoinRoomMutation(options: VueApolloComposable.UseMutationOptions<Ops.JoinRoomMutation, Ops.JoinRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.JoinRoomMutation, Ops.JoinRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.JoinRoomMutation, Ops.JoinRoomMutationVariables>(JoinRoomDocument, options);
}
export type JoinRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.JoinRoomMutation, Ops.JoinRoomMutationVariables>;
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
export function useLeaveRoomMutation(options: VueApolloComposable.UseMutationOptions<Ops.LeaveRoomMutation, Ops.LeaveRoomMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.LeaveRoomMutation, Ops.LeaveRoomMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.LeaveRoomMutation, Ops.LeaveRoomMutationVariables>(LeaveRoomDocument, options);
}
export type LeaveRoomMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.LeaveRoomMutation, Ops.LeaveRoomMutationVariables>;
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
export function useRoomCreatedSubscription(variables: Ops.RoomCreatedSubscriptionVariables | VueCompositionApi.Ref<Ops.RoomCreatedSubscriptionVariables> | ReactiveFunction<Ops.RoomCreatedSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<Ops.RoomCreatedSubscription, Ops.RoomCreatedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<Ops.RoomCreatedSubscription, Ops.RoomCreatedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<Ops.RoomCreatedSubscription, Ops.RoomCreatedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<Ops.RoomCreatedSubscription, Ops.RoomCreatedSubscriptionVariables>(RoomCreatedDocument, variables, options);
}
export type RoomCreatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<Ops.RoomCreatedSubscription, Ops.RoomCreatedSubscriptionVariables>;