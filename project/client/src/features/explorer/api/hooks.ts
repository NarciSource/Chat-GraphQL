import * as Ops from './operations';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

export const SearchKeywordDocument = gql`
    query searchKeyword($userId: String!, $keyword: String!) {
  search(userId: $userId, keyword: $keyword) {
    roomId
    userId
    content
    createdAt
  }
}
    `;

/**
 * __useSearchKeywordQuery__
 *
 * To run a query within a Vue component, call `useSearchKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchKeywordQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchKeywordQuery({
 *   userId: // value for 'userId'
 *   keyword: // value for 'keyword'
 * });
 */
export function useSearchKeywordQuery(variables: Ops.SearchKeywordQueryVariables | VueCompositionApi.Ref<Ops.SearchKeywordQueryVariables> | ReactiveFunction<Ops.SearchKeywordQueryVariables>, options: VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>(SearchKeywordDocument, variables, options);
}
export function useSearchKeywordLazyQuery(variables?: Ops.SearchKeywordQueryVariables | VueCompositionApi.Ref<Ops.SearchKeywordQueryVariables> | ReactiveFunction<Ops.SearchKeywordQueryVariables>, options: VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>(SearchKeywordDocument, variables, options);
}
export type SearchKeywordQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<Ops.SearchKeywordQuery, Ops.SearchKeywordQueryVariables>;