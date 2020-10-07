import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { Button, Table, Modal } from "semantic-ui-react";
import client from "./services/client";

import Header from "./components/Header";
import Orders from "./components/Orders";
import Items from "./components/Items";

function Home() {
  const [selectedOrder, setSelectedOrder] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  console.log("AQUI: ", selectedOrder);
  return (
    <ApolloProvider client={client}>
      <div className="home">
        <Header />
        <div className="home-content">
          <Button color="green">Nova comanda</Button>
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
          {selectedOrder !== undefined ? (
            <Modal
              open={modalOpen}
              closeIcon
              onClose={() => setModalOpen(false)}
            >
              <Modal.Header>{`Eventos da ordem # ${selectedOrder.id}`}</Modal.Header>
              <Modal.Content>
                <h3>Abertura/fechamento da comanda</h3>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={1}>Data</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Evento</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {selectedOrder.events.map((item) => {
                      if (
                        item.eventType === "ORDER_OPEN" ||
                        item.eventType === "ORDER_CLOSED"
                      ) {
                        const date = new Date(item.timestamp);
                        return (
                          <Table.Row>
                            <Table.Cell>{date.toUTCString()}</Table.Cell>
                            <Table.Cell>
                              {item.eventType === "ORDER_OPEN"
                                ? "Ordem aberta"
                                : "Ordem fechada"}
                            </Table.Cell>
                          </Table.Row>
                        );
                      } else return;
                    })}
                  </Table.Body>
                </Table>
                <h3>Adição/remoção de itens</h3>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={2}>Data</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Evento</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Dado</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {selectedOrder.events.map((item) => {
                      if (
                        item.eventType === "ITEM_ADD" ||
                        item.eventType === "ITEM_REMOVE"
                      ) {
                        const date = new Date(item.timestamp);
                        return (
                          <Table.Row>
                            <Table.Cell>{date.toUTCString()}</Table.Cell>
                            <Table.Cell>
                              {item.eventType === "ITEM_ADD"
                                ? "Adiciona item"
                                : "Remove item"}
                            </Table.Cell>
                            <Table.Cell>
                              {JSON.parse(item.data).name}
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    })}
                  </Table.Body>
                </Table>
                <div className={"modal-buttons"}>
                  <div>
                    <Button>Adicionar item</Button>
                    <Button>Remover item</Button>
                  </div>
                  <Button color="red">Finalizar comanda</Button>
                </div>
              </Modal.Content>
            </Modal>
          ) : null}
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
