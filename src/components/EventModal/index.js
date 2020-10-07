import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Modal, Table, Button, Select } from "semantic-ui-react";
import { ADD_EVENT } from "../../services/queries";

import AddItem from "../AddItem";
import RemoveItem from "../RemoveItem";

function checkIfOpen(order) {
  for (let event of order.events) {
    if (event.eventType === "ORDER_CLOSED") {
      return false;
    }
  }
  return true;
}

const EventModal = (props) => {
  let { selectedOrder, modalOpen, setModalOpen } = props;
  const [addItems, setAddItems] = useState(false);
  const [removeItems, setRemoveItems] = useState(false);
  const [addEvent, { data }] = useMutation(ADD_EVENT);

  const closeOrder = () => {
    const orderID = selectedOrder.id;
    const eventType = "ORDER_CLOSED";
    const timestamp = new Date().toISOString();
    let price = 0;

    for (let item of selectedOrder.events) {
      if (item.eventType === "ITEM_ADD") {
        price += parseFloat(JSON.parse(item.data).price);
      } else if (item.eventType === "ITEM_REMOVE") {
        price -= parseFloat(JSON.parse(item.data).price);
      }
    }

    let data = JSON.toString({ price });

    addEvent({ variables: { orderID, eventType, timestamp, data } });
  };

  return selectedOrder !== undefined ? (
    <Modal open={modalOpen} closeIcon onClose={() => setModalOpen(false)}>
      <Modal.Header>{`Eventos da ordem # ${selectedOrder.id}`}</Modal.Header>
      {addItems ? (
        <AddItem id={selectedOrder.id} />
      ) : removeItems ? (
        <RemoveItem id={selectedOrder.id} />
      ) : (
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
                  let name;
                  try {
                    name = item.data.replace(/"\\/g, '"');
                    name = JSON.parse(item.data).name;
                  } catch (e) {
                    name = "Indefinido";
                  }
                  return (
                    <Table.Row>
                      <Table.Cell>{date.toUTCString()}</Table.Cell>
                      <Table.Cell>
                        {item.eventType === "ITEM_ADD"
                          ? "Adiciona item"
                          : "Remove item"}
                      </Table.Cell>
                      <Table.Cell>{name}</Table.Cell>
                    </Table.Row>
                  );
                }
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
      )}
      <Modal.Actions>
        {checkIfOpen(selectedOrder) ? (
          <div className={"modal-buttons"}>
            <div>
              <Button.Group>
                <Button
                  toggle
                  active={addItems}
                  onClick={() => {
                    setAddItems(!addItems);
                    if (removeItems) setRemoveItems(false);
                  }}
                >
                  Adicionar item
                </Button>
                <Button.Or text="ou" />
                <Button
                  toggle
                  active={removeItems}
                  onClick={() => {
                    setRemoveItems(!removeItems);
                    if (addItems) setAddItems(false);
                  }}
                >
                  Remover item
                </Button>
              </Button.Group>
            </div>
            <Button color="red" onClick={closeOrder}>
              Finalizar comanda
            </Button>
          </div>
        ) : null}
      </Modal.Actions>
    </Modal>
  ) : null;
};

export default EventModal;
