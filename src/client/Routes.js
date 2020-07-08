import Home from "./domain/Home/Home";
import NotFound from "./domain/Home/NotFound";
import ArticleList from "./domain/Home/ArticleList";
import App from "./App.jsx";

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true,
      },
      {
        ...Home,
        path: "/photos",
        exact: true,
      },
      {
        path: "/posts/:id",
        ...ArticleList,
      },
      {
        ...NotFound,
      },
    ],
  },
];
