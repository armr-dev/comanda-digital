import React, { useState } from "react";
import { Modal, Table, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../services/queries";
import ItemSelector from "../ItemSelector";

const AddItem = (props) => {
  const [item, setItem] = useState({});
  const [addEvent, { data }] = useMutation(ADD_EVENT);

  const addItem = () => {
    const orderID = props.id;
    const eventType = "ITEM_ADD";
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
          icon="plus"
          color="green"
          onClick={addItem}
        />
      </div>
    </Modal.Content>
  );
};

export default AddItem;
