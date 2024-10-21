import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './CategoryList.css';
import axios from 'axios';
import CategoryCard from './CategoryCard';

const CategoryList = () => {
  const [categories, setCategories] = useState(
    [
    //   { name: 'Men', path: '/category/men', color: '#3498db', parent: null },    // Blue
    //   { name: 'Women', path: '/category/women', color: '#e74c3c', parent: null }, // Red
    //   { name: 'Boys', path: '/category/boys', color: '#2ecc71', parent: null },   // Green
    //   { name: 'Girls', path: '/category/girls', color: '#f39c12', parent: null }  // Yellow
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      // setError(null);
      try {
        // Fetch the data from the backend using axios
        const response = await axios.get(`http://127.0.0.1:8000/api/catergories/`);
        console.log(response.data)
        setCategories(response.data);
      } catch (err) {
        // setError('Error fetching data');
        console.error(err);
      } finally {
        // setLoading(false);
      }
  };

  fetchData();
},[]);


  return (
    <div className="category-grid">
      {categories.map((category) => (
        // ! category.parent ?
          category.level == 0 ?
          <CategoryCard category={category} path = {`category/${category.name}`} />:
          <></>
      ))}
    </div>
  );
};

export default CategoryList;
