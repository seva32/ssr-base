import React from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { ErrorBoundary } from "./components";
import { Layout, CookieBanner } from "./domain";

const App = ({ route }) => {
  return (
    <Layout>
      <CookieBanner />
      <ErrorBoundary>{renderRoutes(route.routes)}</ErrorBoundary>
    </Layout>
  );
};

App.propTypes = {
  route: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  route: null,
};

export default {
  component: App,
};

// import React from "react";
// import {
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams,
// } from "react-router-dom";

// import Posts from "./domain/Posts/Posts";

// export default function App() {
//   return (
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/topics">Topics</Link>
//         </li>
//         <li>
//           <Link to="/posts">Posts</Link>
//         </li>
//       </ul>

//       <Switch>
//         <Route path="/about">
//           <About />
//         </Route>
//         <Route path="/topics">
//           <Topics />
//         </Route>
//         <Route path="/posts">
//           <Posts />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topics() {
//   const match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   const { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
