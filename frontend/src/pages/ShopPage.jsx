import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import "./ShopPage.css";

const ShopPage = () => {
  const [allPerfumes, setAllPerfumes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/perfumes");
        setAllPerfumes(response.data.perfumes);
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
    return allPerfumes;
  }, [allPerfumes]);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Our Collection</h1>
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
