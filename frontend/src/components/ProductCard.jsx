import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  // Fallback jika image_url tidak ada
  const imageUrl =
    product.image_url || "https://via.placeholder.com/400x500.png?text=Image+Not+Found";

  return (
    <div className="product-card-minimal">
      <div className="card-image-container">
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="card-info">
        <p className="perfume-brand">{product.brand}</p>
        <h4 className="perfume-name">{product.name}</h4>
      </div>
    </div>
  );
}

export default ProductCard;
