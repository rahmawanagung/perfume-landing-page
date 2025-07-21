import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/perfume/${product.id}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.imgurl}
            alt={`${product.brand} - ${product.name}`}
            className="product-image"
            loading="lazy"
          />
        </div>
        <h3 className="product-brand">{product.brand}</h3>
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;