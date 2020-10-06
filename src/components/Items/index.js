import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ITEMS } from "../../services/queries";
import { Loader, Table } from "semantic-ui-react";

function Items() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading)
    return (
      <div className="loader">
        <Loader active inline="centered" />
      </div>
    );
  if (error) return `Error! ${error}`;

  console.log("ITEMS:", data.getItems);

  return data.getItems.map((item) => {
    return (
      <Table.Row>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.description}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
      </Table.Row>
    );
  });
}

export default Items;
