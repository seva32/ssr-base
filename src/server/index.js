/* eslint-disable no-undef */
import path from "path";
import express from "express";
import Cookies from "cookies";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import htmlMiddleware from "./middleware/html";
import storeMiddleware from "./middleware/store";
import renderMiddleware from "./middleware/render";
import logger from "./middleware/logger";
import authRouter from "./router/authRouter";

const publicPath = path.join(__dirname, "public");
const options = { extensions: false, index: false, redirect: false };

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

mongoose.connect(process.env.REACT_APP_MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default app => {
  app.set("x-powered-by", false);
  app.use(bodyParser.json({ type: "*/*" }));
  app.use(cors());
  app.use(logger);
  app.use(Cookies.express());

  app.use("/", express.static(publicPath, options));
  authRouter(app);
  app.use(htmlMiddleware());
  app.use("*", asyncMiddleware(storeMiddleware()));
  app.use(renderMiddleware());
};
