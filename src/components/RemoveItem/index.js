import React, { useState } from "react";
import { Modal, Table, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../services/queries";
import ItemSelector from "../ItemSelector";

const RemoveItem = (props) => {
  const [item, setItem] = useState({});
  const [addEvent, { data }] = useMutation(ADD_EVENT);

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
