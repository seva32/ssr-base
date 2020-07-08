import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import serialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";

import Routes from "../../client/Routes";

const renderMiddleware = () => (req, res) => {
  let html = req.html;
  const store = req.store;
  const routerContext = {};
  const sheet = new ServerStyleSheet();
  const htmlContent = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <ReduxProvider store={store}>
        <StaticRouter location={req.url} context={routerContext}>
          <div>{renderRoutes(Routes)}</div>
        </StaticRouter>
      </ReduxProvider>
    )
  );
  const helmet = Helmet.renderStatic();
  const htmlReplacements = {
    HTML_CONTENT: htmlContent,
    STYLE_TAGS: sheet.getStyleTags(),
    SERVER_DATA: serialize({ seb: "seb" }, { isJSON: true }),
    HELMET_HTML_ATTRIBUTES: helmet.htmlAttributes.toString(),
    HELMET_META_ATTRIBUTES: `
       ${helmet.title.toString()}
       ${helmet.meta.toString()}
       ${helmet.link.toString()}
     `,
    HELMET_BODY_ATTRIBUTES: helmet.bodyAttributes.toString(),
    PRELOADED_STATE: serialize(store.getState(), { isJSON: true }),
  };

  Object.keys(htmlReplacements).forEach((key) => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp(`__${escapeStringRegexp(key)}__`, "g"),
      value
    );
  });

  if (routerContext.url) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.redirect(302, routerContext.url);
  } else {
    res.send(html);
  }
};

export default renderMiddleware;
