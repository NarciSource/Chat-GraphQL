import * as Ops from './operations';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

export const UserPresenceDocument = gql`
    subscription userPresence {
  userPresence
}
    `;

/**
 * __useUserPresenceSubscription__
 *
 * To run a query within a Vue component, call `useUserPresenceSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserPresenceSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useUserPresenceSubscription();
 */
export function useUserPresenceSubscription(options: VueApolloComposable.UseSubscriptionOptions<Ops.UserPresenceSubscription, Ops.UserPresenceSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<Ops.UserPresenceSubscription, Ops.UserPresenceSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<Ops.UserPresenceSubscription, Ops.UserPresenceSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<Ops.UserPresenceSubscription, Ops.UserPresenceSubscriptionVariables>(UserPresenceDocument, {}, options);
}
export type UserPresenceSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<Ops.UserPresenceSubscription, Ops.UserPresenceSubscriptionVariables>;