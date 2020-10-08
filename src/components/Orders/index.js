import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "../../services/queries";
import { Loader, Dimmer, Table } from "semantic-ui-react";

function checkIfOpen(order) {
  for (let event of order.events) {
    if (event.eventType === "ORDER_CLOSED") {
      return false;
    }
  }
  return true;
}

function Orders(props) {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  if (error) return `Error! ${error}`;

  // console.log(data);
  return (
    <Table.Body>
      {data.getOrders.map((item) => {
        return (
          <Table.Row
            onClick={() => {
              props.selectedOrder(item);
              props.modalOpen(true);
            }}
          >
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{checkIfOpen(item) ? "Aberta" : "Fechada"}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
}

export default Orders;
