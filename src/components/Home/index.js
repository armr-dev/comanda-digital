import React, { useState } from "react";
import { ApolloProvider, useMutation } from "@apollo/client";
import { Button, Table, Modal, Dimmer, Loader } from "semantic-ui-react";
import client from "../../services/client";
import { CREATE_ORDER, GET_ORDERS } from "../../services/queries";
import { notifySuccess, notifyError } from "../../utils/notifications";

import Header from "../Header";
import Orders from "../Orders";
import EventModal from "../EventModal";

function Home() {
  const [selectedOrder, setSelectedOrder] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [
    createOrder,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORDER);

  // console.log("AQUI: ", selectedOrder);
  console.log("AQUI: ", modalOpen);
  return (
    <div className="home">
      {mutationLoading && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
      <div className="home-content">
        <Button
          color="green"
          onClick={() => {
            createOrder({
              refetchQueries: [{ query: GET_ORDERS }],
              onCompleted: () => {
                mutationError
                  ? notifyError(mutationError)
                  : notifySuccess("Ordem criada com sucesso!");
              },
            });
          }}
        >
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
        {selectedOrder && (
          <EventModal
            modalOpen={modalOpen}
            id={selectedOrder.id}
            setModalOpen={setModalOpen}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
