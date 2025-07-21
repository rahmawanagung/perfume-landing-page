import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import './ShopPage.css';

const ShopPage = () => {
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/perfumes'); // Menggunakan proxy Vite
        setAllPerfumes(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch perfumes:", err);
        setError("Gagal memuat data produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, []);

  const filteredPerfumes = useMemo(() => {
    if (activeFilter === 'Semua') {
      return allPerfumes;
    }
    const genderFilter = activeFilter === 'Pria' ? 'Pria' : 'Wanita';
    return allPerfumes.filter(
      (p) => p.gender === genderFilter || p.gender === 'Unisex'
    );
  }, [allPerfumes, activeFilter]);

  const filters = ['Semua', 'Pria', 'Wanita'];

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Our Collection</h1>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      <main>
        {loading && <div className="loading-message">Memuat Produk... ✨</div>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && <ProductList products={filteredPerfumes} />}
      </main>
    </div>
  );
};

export default ShopPage;