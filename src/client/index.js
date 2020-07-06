import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.scss";
import "./index.css";
import App from "./App.jsx";
import configureStore from "./store/store";

const store = configureStore();

ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
