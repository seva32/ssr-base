import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import merge from "deepmerge";
import { persistStore } from "redux-persist";

import persistedReducer from "../reducers";

const configureStore = (initialState) => {
  const token = localStorage.getItem("token") || "";

  const preloadedState = window.PRELOADED_STATE;

  const buffer = merge(preloadedState, {
    auth: { authenticated: token, errorMessage: "" },
  });

  initialState = merge(initialState, buffer);

  const enhancer =
    process.env.NODE_ENV !== "production"
      ? compose(applyMiddleware(reduxPromise, reduxThunk, logger))
      : compose(applyMiddleware(reduxPromise, reduxThunk));

  return createStore(persistedReducer, initialState, enhancer);
};
const store = configureStore({});
const persistor = persistStore(store);
export default { store, persistor };
