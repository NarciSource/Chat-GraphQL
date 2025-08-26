import { ApolloClient } from "@apollo/client";

let apolloClient: ApolloClient;

const setApolloClient = (client: ApolloClient) => {
  apolloClient = client;
};

export { apolloClient, setApolloClient };
