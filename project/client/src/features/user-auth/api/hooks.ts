import * as Ops from './operations';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

export const SetUserDocument = gql`
    mutation setUser($id: String!) {
  setUser(id: $id)
}
    `;

/**
 * __useSetUserMutation__
 *
 * To run a mutation, you first call `useSetUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSetUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSetUserMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useSetUserMutation(options: VueApolloComposable.UseMutationOptions<Ops.SetUserMutation, Ops.SetUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<Ops.SetUserMutation, Ops.SetUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<Ops.SetUserMutation, Ops.SetUserMutationVariables>(SetUserDocument, options);
}
export type SetUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<Ops.SetUserMutation, Ops.SetUserMutationVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  users
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a Vue component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUsersQuery();
 */
export function useGetUsersQuery(options: VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export function useGetUsersLazyQuery(options: VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>(GetUsersDocument, {}, options);
}
export type GetUsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<Ops.GetUsersQuery, Ops.GetUsersQueryVariables>;