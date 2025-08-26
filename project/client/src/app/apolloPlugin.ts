import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { Kind, OperationTypeNode } from "graphql";
import { createClient } from "graphql-ws";
import { App } from "vue";

import { setApolloClient } from "@/shared/lib/apolloClient";

const HTTP_SERVER_URL = import.meta.env.VITE_GRAPHQL_SERVER_URL;
const WS_SERVER_URL = HTTP_SERVER_URL.replace(/^http:\/\//, "ws://").replace(
  /^https:\/\//,
  "wss://",
);

const httpLink = new HttpLink({ uri: HTTP_SERVER_URL });
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_SERVER_URL,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    // subscription 요청인 경우 wsLink를 사용하고, 외에는 httpLink를 사용
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  from([wsLink]),
  from([httpLink]),
);

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  link: splitLink,

  cache: new InMemoryCache(),
});

setApolloClient(apolloClient);

// vue 플러그인
export default {
  install(app: App) {
    app.provide(DefaultApolloClient, apolloClient);
  },
};
