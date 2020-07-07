import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import "./index.scss";
import "./index.css";
import App from "./App.jsx";
import configRedux from "./store/store";

const { store, persistor } = configRedux;

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const Root = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
};

persistor.subscribe(() => {
  const { bootstrapped } = persistor.getState();
  if (bootstrapped) {
    renderMethod(<Root />, document.getElementById("root"));
  }
});
