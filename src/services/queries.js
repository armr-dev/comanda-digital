import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders {
    id
    events {
      data
      eventType
      id
      timestamp
    }
  }
`;

const GET_ORDER_SUMMARY = gql`
  query getOrderSummary($id: Int!) {
    closedAt
    id
    openedAt
    status
    totalPrice
  }
`;

const GET_ORDER = gql`
  query getOrder($id: Int!) {
    id
    events {
      data
      eventType
      id
      timestamp
    }
  }
`;

const GET_ITEMS = gql`
  query getItems {
    description
    id
    name
    price
  }
`;

export { GET_ORDERS, GET_ORDER_SUMMARY, GET_ORDER, GET_ITEMS };
