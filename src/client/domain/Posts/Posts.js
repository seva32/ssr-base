import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {connect} from "react-redux";
import {List} from "semantic-ui-react";
// import * as Styles from "./Posts.style";
// import { Loader } from "../../components";
// import { Layout } from "../Layout";
import * as actions from "../../actions";
// import requireAuth from "../../components/Auth/requireAuth";

const {Item, Header} = List;

// eslint-disable-next-line react/prop-types
const Posts = ({posts, error, fetchPosts}) => {
  useEffect(() => {
    if (posts && posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts]);
  return (
    // <Layout>
    <>
      <Helmet>
        <title>{`${posts.length !== 0 ? posts.length : ""} P`}</title>
        <meta property="og:title" content="Articles List" />
        <meta
          name="description"
          content={`Latest ${
            posts.length !== 0 ? posts.length : ""
          } articles, popular articles from most popular news websites of the world`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="example.com" />
      </Helmet>
      <h1>Posts</h1>
      {posts && posts.length !== 0 ? (
        <List>
          {posts.map(post => (
            <Item key={post.id}>
              <Header>{post.title}</Header>The lovely luck
            </Item>
          ))}
        </List>
      ) : (
        // <Loader />
        <div>Loading...</div>
      )}
      {error && error.length !== 0 && <h4>{error}</h4>}
    </>
    // </Layout>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  error: PropTypes.string,
  fetchPosts: PropTypes.func,
};

Posts.defaultProps = {
  posts: [],
  error: "",
  fetchPosts: () => {},
};

// export default compose(
//   connect(
//     ({ posts }) => ({ posts: posts.list, error: posts.error }),
//     actions
//   )(requireAuth(Posts))
// );

export default compose(
  connect(
    ({posts}) => ({posts: posts.list, error: posts.error}),
    actions,
  )(Posts),
);
