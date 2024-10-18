import React from 'react';
import './ProductPage.css';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

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
  const { addToCart } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  
  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);

    // Set a timeout to remove the "Added to Cart" message after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-page">
      <div className="product-page-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
        </div>
        <div className="product-info-section">
        {addedToCart && <p className="added-message">Added to Cart!</p>}
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <ul className="product-attributes">
            {product.attributes.map((attribute, index) => (
              <li key={index}>{attribute}</li>
            ))}
          </ul>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

