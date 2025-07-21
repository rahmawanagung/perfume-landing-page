import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          AETHER
        </Link>
        <div className="nav-links">
          <NavLink to="/shop" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Shop
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            About
          </NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;