import * as SchemaTypes from '@/shared/api/types';

export type UserPresenceSubscriptionVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type UserPresenceSubscription = { __typename?: 'Subscription', userPresence: Array<string> };
