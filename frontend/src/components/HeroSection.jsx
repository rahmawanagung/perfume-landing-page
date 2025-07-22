import React from 'react';
import './HeroSection.css';
// Ganti dengan path gambar hero Anda dari Unsplash nanti
import heroImage from '../assets/hero-perfume.jpg'; 

function HeroSection() {
  return (
    <section className="hero-container">
      <div className="hero-text-content">
        <h1 className="hero-headline">Artisanal Fragrance, Modern Soul.</h1>
        <p className="hero-subheadline">
          Discover unique scents that tell a story. Hand-poured, cruelty-free, and designed for the discerning individual.
        </p>
        <button className="hero-cta-button">Explore The Scents</button>
      </div>
      <div className="hero-image-wrapper">
        <img src={heroImage} alt="Elegant perfume bottle display" />
      </div>
    </section>
  );
}

export default HeroSection;