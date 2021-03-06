import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import * as serviceWorker from "./serviceWorker";

import "./styles/styles";

ReactDOM.render(
  <>
    <ToastContainer />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
