import React from 'react';
import './ProductPage.css';

const ProductPage = () => {
  // Example product data (can be fetched from an API)
  const product = {
    id: 1,
    name: 'Comfortable Running Shoes',
    price: 99.99,
    description: 'These running shoes provide extra comfort and support for your feet, making them perfect for long-distance runs.',
    image: '/images/shoe1.jpg',
    attributes: ['Color: Black', 'Size: Available in 6-12', 'Material: Mesh, Rubber Sole']
  };

  return (
    <div className="product-page">
      <div className="product-page-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
        </div>
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <ul className="product-attributes">
            {product.attributes.map((attribute, index) => (
              <li key={index}>{attribute}</li>
            ))}
          </ul>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
