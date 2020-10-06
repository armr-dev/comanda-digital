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

function Orders() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading)
    return (
      <div className="loader">
        <Loader active inline="centered" />
      </div>
    );
  if (error) return `Error! ${error}`;

  console.log("ORDER:", data.getOrders);

  return (
    <Table.Body>
      {data.getOrders.map((item) => {
        return (
          <Table.Row>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{checkIfOpen ? "Aberta" : "Fechada"}</Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
}

export default Orders;