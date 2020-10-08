import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "../../services/queries";
import { Loader, Dimmer, Card, Icon } from "semantic-ui-react";

function checkIfOpen(order) {
  for (let event of order.events) {
    if (event.eventType === "ORDER_CLOSED") {
      return false;
    }
  }
  return true;
}

function checkWhen(order) {
  let times = { opened: "", closed: "" };

  for (let event of order.events) {
    if (event.eventType === "ORDER_CLOSED") {
      times.closed = event.timestamp;
    } else if (event.eventType === "ORDER_OPEN") {
      times.opened = event.timestamp;
    }
  }

  return times;
}

function getItems(order) {
  let items = [];

  for (let event of order.events) {
    if (event.eventType === "ITEM_ADD" || event.eventType === "ITEM_REMOVE") {
      items.push({
        eventType: event.eventType,
        name: JSON.parse(event.data).name,
      });
    }
  }

  console.log(items);
  return items;
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

  return (
    <Card.Group centered>
      {data.getOrders.map((item) => {
        return (
          <Card
            className="card"
            onClick={() => {
              props.selectedOrder(item);
              props.modalOpen(true);
            }}
          >
            <Card.Content
              className={
                checkIfOpen(item)
                  ? "card-header-wrapper open"
                  : "card-header-wrapper closed"
              }
            >
              <Card.Header className="card-header">
                Ordem #{item.id}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <div className="card-content-wrapper">
                <div>Aberta em </div>
                <div>
                  {new Date(checkWhen(item).opened).toLocaleString("pt-BR")}
                </div>
              </div>
              {checkIfOpen(item) ? null : (
                <div className="card-content-wrapper">
                  <div>Fechada em </div>
                  <div>
                    {new Date(checkWhen(item).closed).toLocaleString("pt-BR")}
                  </div>
                </div>
              )}
            </Card.Content>
            <Card.Content>
              <h3 className="card-content-title">Itens</h3>
              {getItems(item).map((item) => {
                return (
                  <div className="card-content-wrapper">
                    <div>{item.name}</div>
                    {item.eventType === "ITEM_ADD" ? (
                      <Icon name="plus" color="green" />
                    ) : (
                      <Icon name="minus" color="red" />
                    )}
                  </div>
                );
              })}
            </Card.Content>
          </Card>
        );
      })}
    </Card.Group>
  );
}

export default Orders;
