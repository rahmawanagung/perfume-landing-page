import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'; // <-- Tambahkan .jsx
import HomePage from './pages/HomePage.jsx'; // <-- Tambahkan .jsx
import ShopPage from './pages/ShopPage.jsx'; // <-- Tambahkan .jsx
import ProductDetailPage from './pages/ProductDetailPage.jsx'; // <-- Tambahkan .jsx
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/perfume/:id" element={<ProductDetailPage />} />
            {/* Tambahkan route lain di sini, contoh: */}
            <Route path="/about" element={<h1>About Us</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;