import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import merge from "deepmerge";

import reducer from "../reducers";

const configureStore = () => {
  const token = localStorage.getItem("token") || "";

  const preloadedState = window.PRELOADED_STATE;

  const initialState = merge(preloadedState, {
    auth: { authenticated: token, errorMessage: "" },
  });

  const enhancer =
    process.env.NODE_ENV !== "production"
      ? compose(applyMiddleware(reduxPromise, reduxThunk, logger))
      : compose(applyMiddleware(reduxPromise, reduxThunk));

  const store = createStore(reducer, initialState, enhancer);

  return store;
};

export default configureStore;
