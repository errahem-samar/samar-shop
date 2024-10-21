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
import Header from './components/Header';
import { CartProvider } from './contexts/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/category/:category" element={<SubCategoryList />} />
          <Route path="/category/:category/:subcategory/:sub_id/" element={<ProductList />} /> 
          <Route path="/category/:category/:subcategory/:sub_id/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
