import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Simulate similar products data (this would be fetched from an API in a real app)
  const allProducts = [
    { id: 1, name: 'Running Shoes', price: 99.99, image: '/images/shoe1.jpg' },
    { id: 2, name: 'Casual Sneakers', price: 79.99, image: '/images/shoe2.jpg' },
    { id: 3, name: 'Leather Boots', price: 129.99, image: '/images/boot1.jpg' },
    { id: 4, name: 'Sandals', price: 49.99, image: '/images/sandal1.jpg' },
    // More products...
  ];

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      // Simulate search for similar products
      // In real app, you would send the file to the backend for processing
      const similar = allProducts.slice(0, 4); // Example: return first 4 products as similar
      setSimilarProducts(similar);
    }
  };

  return (
    <div className="search-page">
      <h1>Search by Image</h1>
      <div className="upload-section">
        <input type="file" onChange={handleImageUpload} accept="image/*" />
      </div>

      {selectedImage && (
        <div className="uploaded-image-section">
          <h2>Uploaded Image</h2>
          <img src={selectedImage} alt="Uploaded" className="uploaded-image" />
        </div>
      )}

      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2>Similar Products</h2>
          <div className="product-grid">
            {similarProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
