import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import {renderRoutes} from "react-router-config";

import "./index.scss";
import "./index.css";
// import App from "./App.jsx";
import configRedux from "./store/store";
import Routes from "./Routes";

const {store, persistor} = configRedux;

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const Root = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
      </BrowserRouter>
    </ReduxProvider>
  );
};

persistor.subscribe(() => {
  const {bootstrapped} = persistor.getState();
  if (bootstrapped) {
    renderMethod(<Root />, document.getElementById("root"));
  }
});
