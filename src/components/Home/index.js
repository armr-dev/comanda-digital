import React, { useState } from "react";
import { ApolloProvider, useMutation } from "@apollo/client";
import { Button, Table, Modal } from "semantic-ui-react";
import client from "../../services/client";
import { CREATE_ORDER } from "../../services/queries";

import Header from "../Header";
import Orders from "../Orders";
import Items from "../Items";
import CustomModal from "../CustomModal";

function Home() {
  const [selectedOrder, setSelectedOrder] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [createOrder, { data }] = useMutation(CREATE_ORDER);

  console.log("AQUI: ", selectedOrder);
  return (
    <div className="home">
      <div className="home-content">
        <Button color="green" onClick={createOrder}>
          Nova comanda
        </Button>
        <h3>Comandas</h3>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>Id</Table.HeaderCell>
              <Table.HeaderCell width={16}>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Orders selectedOrder={setSelectedOrder} modalOpen={setModalOpen} />
        </Table>
        <CustomModal
          modalOpen={modalOpen}
          selectedOrder={selectedOrder}
          setModalOpen={setModalOpen}
        />
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
  );
}

export default Home;
