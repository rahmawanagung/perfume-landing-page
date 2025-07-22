import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/perfumes/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Produk tidak ditemukan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <div className="loading-message">Loading details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return null;

  return (
    <div className="product-detail-page">
      <div className="product-detail-image">
        <img src={product.image_url} alt={`${product.brand} - ${product.name}`} />
      </div>
      <div className="product-detail-info">
        <h2 className="detail-brand">{product.brand}</h2>
        <h1 className="detail-name">{product.name}</h1>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">{formatPrice(product.price)}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
