/* eslint-disable no-undef */
import path from "path";
import express from "express";
import Cookies from "cookies";

import htmlMiddleware from "./middleware/html";
import storeMiddleware from "./middleware/store";
import renderMiddleware from "./middleware/render";
import logger from "./middleware/logger";
import authRouter from "./router/authRouter";

const publicPath = path.join(__dirname, "public");
const options = {extensions: false, index: false, redirect: false};

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default app => {
  app.use(Cookies.express());
  app.use(logger);
  app.use("/", express.static(publicPath, options));
  authRouter(app);
  app.use(htmlMiddleware());
  app.use("*", asyncMiddleware(storeMiddleware()));
  app.use(renderMiddleware());
};
