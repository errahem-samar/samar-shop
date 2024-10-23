import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import axios from 'axios';

const SearchPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null); // To store the actual file for upload

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the actual file for upload
      setSelectedImage(URL.createObjectURL(file)); // For preview purposes
    }
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!imageFile) return;

      const formData = new FormData();
      formData.append('image', imageFile); // Append the file to FormData

      try {
        const response = await axios.post(`http://127.0.0.1:8000/model-api/similar-products/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.error(response.data);
        setSimilarProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSimilarProducts();
  }, [imageFile]);

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
                  <p>${parseFloat(product.price).toFixed(2)}</p>
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
