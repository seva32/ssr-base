/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";
import ArticleDetailModal from "../../components/ArticleDetailModal";
import { fetchPosts } from "../../actions/posts/postsActions";

const ArticleListPage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const readPost = (post) => {
    setCurrentPost(post);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderPosts = () => {
    return props.posts.map((post) => (
      <div className="col s12 m6 l6 xl4" key={post.title}>
        <div className="card large">
          <div className="card-image">
            <LazyLoadImage alt={post.title} src={post.url} />
          </div>
          <div className="card-content">
            <span className="card-title">{post.title}</span>
          </div>
          <div className="card-action">
            <a href="javascript:void(0)" onClick={() => readPost(post)}>
              Read More
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const { posts, location, match } = props;

  const category = props && posts[0] && posts[0].title;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>{`${category} Articles`}</title>
        <meta property="og:title" content={`${category} Articles List`} />
        <meta name="description" content={`Latest ${category}`} />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://react-ssr-ilker.herokuapp.com${location.pathname}`}
        />
      </Helmet>
    );
  };

  const { fetchPosts: loadPosts } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadPosts(match.params.id);
    } else {
      loadPosts();
    }
  }, [loadPosts, match.params.id]);
  return (
    <div>
      {head()}
      {modal ? (
        <ArticleDetailModal handler={closeModal} data={currentPost} />
      ) : null}
      <div className="row">
        <div className="section">
          <h3>{category}</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">{renderPosts()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const loadData = (store, param) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchPosts(param)); // Manually dispatch a network request
};

ArticleListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  fetchPosts: PropTypes.func,
};

ArticleListPage.defaultProps = {
  posts: [],
  location: null,
  match: null,
  fetchPosts: null,
};

export default {
  component: connect(mapStateToProps, { fetchPosts })(ArticleListPage),
  loadData,
};
