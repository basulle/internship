import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { selectGalleryState, selectIsLoadingState } from '../../core/selectors/gallery';
import { downloadGallery } from '../../core/thunks/gallery';
import './styles.css';

const Gallery = (): JSX.Element => {
  const gallery = useSelector(selectGalleryState);
  const isLoadingState = useSelector(selectIsLoadingState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(downloadGallery());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(isLoadingState);
  }, [isLoadingState]);

  return (
    <div className="gallery-container">
      <h1 className="title">Gallery</h1>
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="primary" size="6rem" />
        </div>
      ) : null}
      <div className="gallery-navigation">
        <Link to="/graphs" style={{ textDecoration: 'none' }}>
          <img src="https://img.icons8.com/flat_round/32/000000/left--v1.png" alt="arrow" />
        </Link>
      </div>
      <div>
        {Object.keys(gallery).map((key) => (
          <h3 key={key}>{key}</h3>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
