/**
 * index.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "configs/store";

import App from "app";

const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  MOUNT_NODE
);
