import * as SchemaTypes from '@/shared/api/types';

export type SetUserMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['String']['input'];
}>;


export type SetUserMutation = { __typename?: 'Mutation', setUser: boolean };

export type GetUsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<string> };
