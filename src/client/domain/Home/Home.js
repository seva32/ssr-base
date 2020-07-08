/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types"; // ES6
import { fetchPhotos } from "../../actions/photos/photosActions";
import ArticleDetailModal from "../../components/ArticleDetailModal";

const HomePage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState({});

  const readPhoto = (photo) => {
    setCurrentPhoto(photo);
    setModal(true);
    return false;
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderPhotos = () => {
    return props.photos.list.map((photo) => (
      <div className="col s12 m6 l6 xl4" key={photo.title}>
        <div className="card large">
          <div className="card-image">
            <LazyLoadImage alt={photo.title} src={photo.urlToImage} />
          </div>
          <div className="card-content">
            <span className="card-title">{photo.title}</span>
          </div>
          <div className="card-action">
            <a href="#" onClick={() => readPhoto(photo)}>
              Read More
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Photos</title>
        <meta property="og:title" content="SSR Daily News - ilker ALTIN" />
        <meta
          name="description"
          content="Breaking news,latest Photos, popular Photos from most popular news websites of the world"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sebastianfantini.com" />
      </Helmet>
    );
  };

  const { fetchPhotos: loadPhotos } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPhotos();
  }, [loadPhotos]);
  return (
    <div>
      {head()}
      {modal ? (
        <ArticleDetailModal handler={closeModal} data={currentPhoto} />
      ) : null}
      <div className="row">
        <div className="section">
          <h3>Popular Photos</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">{renderPhotos()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
  };
};

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchPhotos()); // Manually dispatch a network request
};

HomePage.propTypes = {
  photos: PropTypes.object,
  fetchPhotos: PropTypes.func,
};

HomePage.defaultProps = {
  Photos: {},
  fetchPhotos: null,
};

export default {
  component: connect(mapStateToProps, { fetchPhotos })(HomePage),
  loadData,
};
