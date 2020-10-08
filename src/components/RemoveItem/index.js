import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../services/queries";

import { Modal, Button, Loader, Dimmer } from "semantic-ui-react";

import ItemSelector from "../ItemSelector";
import { notifySuccess, notifyError } from "../../utils/notifications";

const RemoveItem = (props) => {
  const [item, setItem] = useState({});
  const [addEvent, { loading }] = useMutation(ADD_EVENT, {
    onCompleted: () => {
      notifySuccess("Item removido com sucesso!");
    },
    onError: () => {
      notifyError("Erro remover item!");
    },
  });

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  const removeItem = () => {
    const orderID = props.id;
    const eventType = "ITEM_REMOVE";
    const timestamp = new Date().toISOString();
    const data = item;

    console.log(orderID, eventType, timestamp, data);

    addEvent({ variables: { orderID, eventType, timestamp, data } });
  };

  return (
    <Modal.Content>
      <div className="add-items">
        <ItemSelector callback={setItem} />
        <Button
          className="add-button"
          icon="minus"
          color="red"
          onClick={removeItem}
        />
      </div>
    </Modal.Content>
  );
};

export default RemoveItem;
