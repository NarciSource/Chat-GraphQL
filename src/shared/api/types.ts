export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  setUser: Scalars['Boolean']['output'];
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


export type MutationSetUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationTypingArgs = {
  roomId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getUsers: Array<Scalars['String']['output']>;
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
  userPresence: Array<Scalars['String']['output']>;
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
