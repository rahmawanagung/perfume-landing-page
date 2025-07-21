import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="hero-content">
        <h1 className="hero-title">Essence of Being</h1>
        <p className="hero-subtitle">Discover our collection of curated fragrances.</p>
        <Link to="/shop" className="hero-button">Explore Collection</Link>
      </div>
    </div>
  );
};

export default HomePage;