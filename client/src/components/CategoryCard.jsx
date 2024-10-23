import React from "react";
import './SubCategoryList.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({category, path}) => {
    return (
        // <div 
        // key={category.id} 
        // className="category-item"
        // style={{ backgroundColor: category.color }}
        // >
        // <Link to={category.path}>
        //     <h2>{category.name}</h2>
        // </Link>
        // </div>
        <div 
        // key={category.id} 
        className="subcategory-item"
        // http://localhost:8000/media/${product.image}
        style={{
             backgroundImage: `url(http://localhost:8000/${category.image})`,
            //   backgroundColor: category.color
             }}
      >
        <Link to={path}>
          <h2>{category.name}</h2>
        </Link>
      </div>
      );
};

export default CategoryCard




