import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  // Example cart data (in a real scenario, this would be fetched from a global state or local storage)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Running Shoes', price: 99.99, quantity: 1, image: '/images/shoe1.jpg' },
    { id: 2, name: 'Casual Sneakers', price: 79.99, quantity: 1, image: '/images/shoe2.jpg' },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <div className="cart-actions">
              <button className="clear-cart-button" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="complete-order-button">Complete Order</button>
              <Link to="/" className="add-more-products-button">
                Add More Products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty. Start adding products!</p>
      )}
    </div>
  );
};

export default CartPage;
