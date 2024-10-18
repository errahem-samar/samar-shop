import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {
  const categories = [
    { name: 'Men', path: '/category/men/subcategories', color: '#3498db' },    // Blue
    { name: 'Women', path: '/category/women/subcategories', color: '#e74c3c' }, // Red
    { name: 'Boys', path: '/category/boys/subcategories', color: '#2ecc71' },   // Green
    { name: 'Girls', path: '/category/girls/subcategories', color: '#f39c12' }  // Yellow
  ];

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div 
          key={category.name} 
          className="category-item"
          style={{ backgroundColor: category.color }}
        >
          <Link to={category.path}>
            <h2>{category.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
