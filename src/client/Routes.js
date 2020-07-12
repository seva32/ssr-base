import App from "./App.js";
import {
  Home,
  HomeResponsive,
  NotFound,
  Posts,
  SigninFormUI,
  Signout,
  SignupFormUI,
} from "./domain";

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
        ...HomeResponsive,
        path: "/homeresponsive",
        exact: true,
      },
      {
        path: "/posts",
        ...Posts,
      },
      {
        path: "/signin",
        ...SigninFormUI,
      },
      {
        path: "/signup",
        ...SignupFormUI,
      },
      {
        path: "signout",
        ...Signout,
      },
      // {
      //   path: "/posts/:id",
      //   ...PostsDetail,
      // },
      {
        ...NotFound,
      },
    ],
  },
];
