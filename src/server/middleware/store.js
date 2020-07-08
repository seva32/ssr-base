import { createStore, combineReducers } from "redux";
import { getStoredState, persistReducer } from "redux-persist";
import {
  CookieStorage,
  NodeCookiesWrapper,
} from "redux-persist-cookie-storage";
import Cookies from "cookies";
import { matchRoutes } from "react-router-config";
// import storage from "redux-persist/lib/storage";

// import rootReducer from "../../client/reducers";
import auth from "../../client/reducers/authReducer";
import posts from "../../client/reducers/postsReducer";
import photos from "../../client/reducers/photosReducer";
import Routes from "../../client/Routes";

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
    photos,
  });

  const reducer = persistReducer(rootPersistConfig, rootReducer);

  const store = createStore(reducer, preloadedState);

  const params = req.params[0].split("/");
  const id = params[2];
  const routes = matchRoutes(Routes, req.path);

  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, id) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, _reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    req.store = store;
    res.removeHeader("Set-Cookie");
    next();
  });
};

export default storeMiddleware;
