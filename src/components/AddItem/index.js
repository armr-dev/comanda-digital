import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_EVENT, GET_ORDER } from "../../services/queries";

import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";

import ItemSelector from "../ItemSelector";
import { notifySuccess, notifyError } from "../../utils/notifications";

const AddItem = (props) => {
  const [item, setItem] = useState({});
  const [addEvent, { loading }] = useMutation(ADD_EVENT, {
    onCompleted: () => {
      notifySuccess("Item adicionado com sucesso!");
    },
    onError: () => {
      notifyError("Erro ao adicionar item!");
    },
  });

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  const addItem = () => {
    const orderID = props.id;
    const eventType = "ITEM_ADD";
    const timestamp = new Date().toISOString();
    const data = item;

    console.log(orderID, eventType, timestamp, data);

    addEvent({
      variables: { orderID, eventType, timestamp, data },
      refetchQueries: [{ query: GET_ORDER, variables: { id: orderID } }],
    });
  };

  return (
    <Modal.Content>
      <div className="add-items">
        <ItemSelector callback={setItem} />
        <Button
          className="add-button"
          icon="plus"
          color="green"
          onClick={addItem}
        />
      </div>
    </Modal.Content>
  );
};

export default AddItem;
