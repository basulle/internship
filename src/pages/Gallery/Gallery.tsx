import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { selectGalleryState, selectIsLoadingState } from '../../core/selectors/gallery';
import { downloadGallery } from '../../core/thunks/gallery';
import './styles.css';

const Gallery = (): JSX.Element => {
  const gallery = useSelector(selectGalleryState);
  const isLoadingState = useSelector(selectIsLoadingState);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    dispatch(downloadGallery());
    firebase
      .database()
      .ref()
      .child('gallery')
      .once('value', (snapshot) => {
        setPages(Math.ceil(snapshot.numChildren() / 3));
      });
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(isLoadingState);
  }, [isLoadingState]);

  // const test = useCallback(() => {
  //   const galleryRef = firebase.database().ref().child('gallery');
  //   let lastValue: string;
  //   const pageQuery = galleryRef.limitToFirst(2);
  //   pageQuery.once('value', (snapshot) => {
  //     snapshot.forEach((child) => {
  //       lastValue = child.key;
  //     });
  //   });
  // }, []);

  const handlePaginationChange = useCallback(({ target: { value } }, page) => {
    setSelectedPage(page);
  }, []);

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
      <div className="gallery-list">
        {Object.keys(gallery).map((key) => (
          <div key={key} className="gallery-item">
            <h3>{gallery[key].graphName}</h3>
            <img src={gallery[key].url} alt="graph" />
          </div>
        ))}
      </div>
      <Pagination count={pages} color="primary" onChange={handlePaginationChange} />
    </div>
  );
};

export default Gallery;
