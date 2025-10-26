import * as SchemaTypes from '@/shared/api/types';

export type SearchKeywordQueryVariables = SchemaTypes.Exact<{
  userId: SchemaTypes.Scalars['String']['input'];
  keyword: SchemaTypes.Scalars['String']['input'];
}>;


export type SearchKeywordQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Message', roomId: string, userId: string, content?: string | null, createdAt?: any | null }> };
