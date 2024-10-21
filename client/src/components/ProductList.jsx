import React, {useState, useEffect} from 'react';
import './ProductList.css';
import { Link, useParams } from 'react-router-dom';
import productsData from '../data/men-shoes.json';
import axios from 'axios';

const ProductList = () => {
// load file -> create products state to contain data
  const [products, setProducts] = useState(productsData.products)
  const { category, subcategory, sub_id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the backend using axios
        const response = await axios.get(`http://127.0.0.1:8000/api/category/${sub_id}/products/`);
        console.log(response.data)
        setProducts(response.data)
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
    <div className="product-grid">
      {products.map((product) => (
          <Link to={"product/"+product.id}>
        <div key={product.id} className="product-card">

          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>${parseFloat(product.price).toFixed(2)}</p>
          </div>
        </div>
          </Link>
      ))}
    </div>
  );
};

export default ProductList;
