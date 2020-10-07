import React, { useState } from "react";
import { ApolloProvider, useMutation } from "@apollo/client";
import { Button, Table, Modal } from "semantic-ui-react";
import client from "../../services/client";
import { CREATE_ORDER } from "../../services/queries";

import Header from "../Header";
import Orders from "../Orders";
import EventModal from "../EventModal";

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
        <EventModal
          modalOpen={modalOpen}
          selectedOrder={selectedOrder}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
}

export default Home;
