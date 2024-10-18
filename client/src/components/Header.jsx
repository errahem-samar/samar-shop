import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          SAMAR SHOP
        </Link>

        {/* Search Button */}
        <Link to="/search" className="search-button">
          <FaSearch />
        </Link>

        {/* Cart Icon */}
        <div className="cart-container">
          <Link to="/cart" className="cart-button">
            <FaShoppingCart />
          </Link>
          {/* Display number of items in the cart */}
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;
