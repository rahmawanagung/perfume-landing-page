import React, { useState, useEffect } from "react";
import axios from "axios";

// Impor komponen-komponen baru kita
import HeroSection from "../components/HeroSection";
import ProductList from "../components/ProductList";

// Konfigurasi Axios dengan base URL dari environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api", // Fallback ke /api jika env var tidak ada
});

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/perfumes"); // Gunakan instance `api` yang sudah dikonfigurasi
        // Kita hanya akan menampilkan 8 produk pilihan di homepage
        setProducts(response.data.perfumes.slice(0, 8)); // Akses response.data.perfumes
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products for homepage:", err); // Log error lebih detail
        setError("Failed to load products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <HeroSection />

      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Our Collection
        </h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "#666" }}>
          Each fragrance is a meticulously crafted blend of art and science,
          designed to evoke emotion and create memories.
        </p>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

export default HomePage;
