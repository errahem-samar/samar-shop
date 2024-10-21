import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="checkout-button">Complete Order</button>
          </div>
        </div>
      )}

      <Link to="/" className="add-more-button">
        Add More Products
      </Link>
    </div>
  );
};

export default CartPage;
