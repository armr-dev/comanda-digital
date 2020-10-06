import React from "react";
import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "./services/client";
import { GET_ORDERS } from "./services/queries";

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
      <div>
        <h2>foi</h2>
        <Orders id={0} />
      </div>
    </ApolloProvider>
  );
}

export default Home;
