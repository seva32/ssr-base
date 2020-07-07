import { createStore, combineReducers } from "redux";
import { getStoredState, persistReducer } from "redux-persist";
import {
  CookieStorage,
  NodeCookiesWrapper,
} from "redux-persist-cookie-storage";
import Cookies from "cookies";
// import storage from "redux-persist/lib/storage";

// import rootReducer from "../../client/reducers";
import auth from "../../client/reducers/authReducer";
import posts from "../../client/reducers/postsReducer";

const storeMiddleware = () => async (req, res, next) => {
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res));

  const rootPersistConfig = {
    key: "root",
    storage: new CookieStorage(cookieJar),
    blacklist: ["auth"],
  };

  const authPersistConfig = {
    key: "auth",
    storage: new CookieStorage(cookieJar),
    whitelist: ["auth"],
    stateReconciler(inboundState, originalState) {
      return originalState;
    },
  };

  let preloadedState;
  try {
    preloadedState = await getStoredState(rootPersistConfig);
  } catch (e) {
    preloadedState = {};
  }

  const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    posts,
  });

  const reducer = persistReducer(rootPersistConfig, rootReducer);

  req.store = createStore(reducer, preloadedState);
  res.removeHeader("Set-Cookie");
  next();
};

export default storeMiddleware;
