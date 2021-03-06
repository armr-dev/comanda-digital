import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ITEMS } from "../../services/queries";
import { Loader, Select, Dimmer } from "semantic-ui-react";

function ItemSelector(props) {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  if (error) return `Error! ${error}`;

  let options = [];
  for (let item of data.getItems) {
    let value = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
    };
    try {
      value = JSON.stringify(value);
    } catch (e) {
      console.log(e);
    }
    options.push({ key: item.id, value, text: item.name });
  }

  return (
    <Select
      options={options}
      placeholder="Selecione o item"
      fluid
      onChange={(e, { value }) => props.callback(value)}
    />
  );
}

export default ItemSelector;
