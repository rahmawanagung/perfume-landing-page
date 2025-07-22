import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Aetheria
        </NavLink>

        <div className={`navbar-links ${isOpen ? 'is-open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className="nav-link" onClick={() => setIsOpen(false)}>Shop</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>Our Story</NavLink>
        </div>

        <div className="navbar-actions">
          <button className="nav-icon-button">Search</button>
          <button className="nav-icon-button">Cart</button>
        </div>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
      </nav>
    </header>
  );
}

export default Navbar;