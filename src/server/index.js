import path from "path";
import express from "express";

import htmlMiddleware from "./middleware/html";
import storeMiddleware from "./middleware/store";
import renderMiddleware from "./middleware/render";
import Cookies from "cookies";

const publicPath = path.join(__dirname, "/public");
const app = express();

app.use(express.static(publicPath));
app.use(Cookies.express());
app.use(htmlMiddleware());
app.use(storeMiddleware());
app.use(renderMiddleware());

export default app;