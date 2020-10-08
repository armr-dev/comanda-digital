import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT, GET_ORDERS } from "../../services/queries";
import { notifySuccess, notifyError } from "../../utils/notifications";

import { Button, Dimmer, Loader } from "semantic-ui-react";

const CloseOrder = (props) => {
  const [addEvent, { loading, error }] = useMutation(ADD_EVENT, {
    onCompleted: () => {
      notifySuccess("Comanda fechada com sucesso!");
    },
    onError: () => {
      notifyError("Erro ao fechar comanda!");
    },
  });

  if (loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  if (error) return `Error! ${error}`;

  const orderID = props.selectedOrder.id;
  const eventType = "ORDER_CLOSED";
  const timestamp = new Date().toISOString();
  let price = 0;

  for (let item of props.selectedOrder.events) {
    if (item.eventType === "ITEM_ADD") {
      price += parseFloat(JSON.parse(item.data).price);
    } else if (item.eventType === "ITEM_REMOVE") {
      price -= parseFloat(JSON.parse(item.data).price);
    }
  }

  let data = JSON.toString({ price });

  return (
    <Button
      color="red"
      onClick={(e) => {
        e.preventDefault();
        addEvent({
          variables: { orderID, eventType, timestamp, data },
          refetchQueries: [{ query: GET_ORDERS }],
        });
      }}
    >
      Finalizar comanda
    </Button>
  );
};

export default CloseOrder;
