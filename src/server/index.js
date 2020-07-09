import path from "path";
import express from "express";
import Cookies from "cookies";

import htmlMiddleware from "./middleware/html";
import storeMiddleware from "./middleware/store";
import renderMiddleware from "./middleware/render";
import logger from "./middleware/logger";

const publicPath = path.join(__dirname, "/public");
const app = express.Router({ mergeParams: true });
const options = { extensions: false };

<<<<<<< HEAD
app.use(express.static(publicPath, options));
app.use("/static/css", express.static(publicPath, options));
app.use("/static/js", express.static(publicPath, options));
=======
app.use(logger);
app.use(express.static(publicPath));
>>>>>>> master
app.use(Cookies.express());
app.use(htmlMiddleware());
app.use(storeMiddleware());
app.use(renderMiddleware());

export default app;
