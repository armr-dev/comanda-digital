import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Button, Table } from "semantic-ui-react";
import client from "./services/client";

import Header from "./components/Header";
import Orders from "./components/Orders";
import Items from "./components/Items";

function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="home">
        <Header />
        <div className="home-content">
          <Button color="green">Nova comanda</Button>
          <h3>Pedidos</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                <Table.HeaderCell width={20}>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Orders />
          </Table>
          <h3>Items</h3>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>Descrição</Table.HeaderCell>
                <Table.HeaderCell>Preço</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Items />
            </Table.Body>
          </Table>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Home;
