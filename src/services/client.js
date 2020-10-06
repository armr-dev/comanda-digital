import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://sad-kapitsa-2407.edgestack.me/internal/web/comanda/graphql",
  cache: new InMemoryCache(),
});

export default client;
