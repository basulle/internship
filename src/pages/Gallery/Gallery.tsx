import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Gallery = ():JSX.Element => {
  return (
    <div className="gallery-container">
      <h1 className="title">Gallery</h1>
      <div style={{ width: '50%' }}>
        <Link to="/graphs" style={{ textDecoration: 'none' }}>
          <img src="https://img.icons8.com/flat_round/32/000000/left--v1.png" alt="arrow" />
        </Link>
      </div>
    </div> );
};

export default Gallery;