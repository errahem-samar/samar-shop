import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import SubCategoryList from './components/SubCategoryList';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import SearchPage from './components/SearchPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="/category/:category/subcategories" element={<SubCategoryList />} />
        <Route path="/category/:category/subcategories/:subcategory" element={<ProductList />} /> 
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
