import React, {useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CategoryCard from './CategoryCard';
import './SubCategoryList.css';

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState(
    [
      { name: 'Shoes', path: `/category/men/shoes`, backgroundImage: '/images/men-shoes.jpg' },
      { name: 'Clothes', path: `/category/men/clothes`, backgroundImage: '/images/men-clothes.jpg' },
    ]
  )
  const { category } = useParams();
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the backend using axios
        const response = await axios.get(`http://127.0.0.1:8000/api/catergories/`);
        console.log(response.data)
        setSubCategories(response.data);
      } catch (err) {
        // setError('Error fetching data');
        console.error(err);
      } finally {
        // setLoading(false);
      }
  };
  if (firstRender.current) {
    firstRender.current = false;
    fetchData(); // Run fetch only on the first render
  }
  },[]);


  // // Subcategories with background images
  // const subcategories = {
  //   men: [
  //     { name: 'Shoes', path: `/category/men/shoes`, backgroundImage: '/images/men-shoes.jpg' },
  //     { name: 'Clothes', path: `/category/men/clothes`, backgroundImage: '/images/men-clothes.jpg' },
  //   ],
  //   women: [
  //     { name: 'Shoes', path: `/category/women/shoes`, backgroundImage: '/images/women-shoes.jpg' },
  //     { name: 'Clothes', path: `/category/women/clothes`, backgroundImage: '/images/women-clothes.jpg' },
  //   ],
  //   boys: [
  //     { name: 'Shoes', path: `/category/boys/shoes`, backgroundImage: '/images/boys-shoes.jpg' },
  //     { name: 'Clothes', path: `/category/boys/clothes`, backgroundImage: '/images/boys-clothes.jpg' },
  //   ],
  //   girls: [
  //     { name: 'Shoes', path: `/category/girls/shoes`, backgroundImage: '/images/girls-shoes.jpg' },
  //     { name: 'Clothes', path: `/category/girls/clothes`, backgroundImage: '/images/girls-clothes.jpg' },
  //   ],
  // };


  return (
    <div className="subcategory-grid">
      {subCategories.map((subcategory, index) => (
        subcategory.parent && subcategory.parent.name == category? 
        <CategoryCard key={category.id || `category-${index}`}  category={subcategory} path = {`/category/${category}/${subcategory.name}/${subcategory.id}`} />:
        (
          <React.Fragment key={`empty-${index}`}> {/* Key for the empty fragment */}
            <></>
          </React.Fragment>
        )
      ))}
    </div>
  );
};

export default SubCategoryList;
