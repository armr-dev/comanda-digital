import React from "react";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { Button } from "semantic-ui-react";
import client from "./services/client";
import { GET_ORDERS } from "./services/queries";

import Header from "./components/Header";

function Orders({ id }) {
  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return console.log("FOI: ", data);
}

function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="home">
        <Header />
        <Button>Nova comanda</Button>
      </div>
    </ApolloProvider>
  );
}

export default Home;
