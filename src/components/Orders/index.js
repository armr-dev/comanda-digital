import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "../../services/queries";
import { Loader, Table } from "semantic-ui-react";

function checkIfOpen(order) {
  for (let item in order) {
    if (item.eventType === "ORDER_CLOSED") {
      return false;
    } else {
      return true;
    }
  }
}

function Orders(props) {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading)
    return (
      <div className="loader">
        <Loader active inline="centered" />
      </div>
    );
  if (error) return `Error! ${error}`;

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
            <Table.Cell>{checkIfOpen ? "Aberta" : "Fechada"}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
}

export default Orders;
