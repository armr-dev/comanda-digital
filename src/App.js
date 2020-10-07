import React, { useState } from "react";
import { ApolloProvider, useMutation } from "@apollo/client";
import client from "./services/client";
import { CREATE_ORDER } from "./services/queries";

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Home />
    </ApolloProvider>
  );
}

export default App;
