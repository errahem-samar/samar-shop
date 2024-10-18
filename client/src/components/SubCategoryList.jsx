import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './SubCategoryList.css';

const SubCategoryList = () => {
  const { category } = useParams();

  // Subcategories with background images
  const subcategories = {
    men: [
      { name: 'Shoes', path: `/category/men/subcategories/shoes`, backgroundImage: '/images/men-shoes.jpg' },
      { name: 'Clothes', path: `/category/men/subcategories/clothes`, backgroundImage: '/images/men-clothes.jpg' },
    ],
    women: [
      { name: 'Shoes', path: `/category/women/subcategories/shoes`, backgroundImage: '/images/women-shoes.jpg' },
      { name: 'Clothes', path: `/category/women/subcategories/clothes`, backgroundImage: '/images/women-clothes.jpg' },
    ],
    boys: [
      { name: 'Shoes', path: `/category/boys/subcategories/shoes`, backgroundImage: '/images/boys-shoes.jpg' },
      { name: 'Clothes', path: `/category/boys/subcategories/clothes`, backgroundImage: '/images/boys-clothes.jpg' },
    ],
    girls: [
      { name: 'Shoes', path: `/category/girls/subcategories/shoes`, backgroundImage: '/images/girls-shoes.jpg' },
      { name: 'Clothes', path: `/category/girls/subcategories/clothes`, backgroundImage: '/images/girls-clothes.jpg' },
    ],
  };

  // Get the specific subcategories for the selected category
  const selectedSubcategories = subcategories[category] || [];

  return (
    <div className="subcategory-grid">
      {selectedSubcategories.map((subcategory) => (
        <div 
          key={subcategory.name} 
          className="subcategory-item"
          style={{ backgroundImage: `url(${subcategory.backgroundImage})` }}
        >
          <Link to={subcategory.path}>
            <h2>{subcategory.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryList;
