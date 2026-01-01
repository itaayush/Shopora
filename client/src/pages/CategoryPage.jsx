import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/cart';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();

  
  const addToCart = (product) => {
    let myCart = [...cart];
    const existingItemIndex = myCart.findIndex((item) => item._id === product._id);
    

    if (existingItemIndex !== -1) {
      myCart[existingItemIndex].quantity = (myCart[existingItemIndex].quantity || 1) + 1;
    } else {
      myCart.push({ ...product, quantity: 1 });
    }
    
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    toast.success("Item Added to Cart");
  };

  const removeFromCart = (pid) => {
    let myCart = [...cart];
    const existingItemIndex = myCart.findIndex((item) => item._id === pid);
    
    if (existingItemIndex !== -1) {
      if ((myCart[existingItemIndex].quantity || 1) > 1) {
        myCart[existingItemIndex].quantity -= 1;
      } else {
        myCart.splice(existingItemIndex, 1);
      }
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }
  };

  const getQuantity = (pid) => {
    const item = cart.find((item) => item._id === pid);
    return item ? (item.quantity || 1) : 0;
  };

  
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');

      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

 
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/v1/product/get-product');
      setLoading(false);
      if (data?.success){
        setProducts(data.products);
      }
    } catch (error){
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() =>{
    getAllCategories();
    getAllProducts();
  }, []);

  
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="category-page">
      <div className="filter-container">
        <h2>Browse by Category</h2>
        <select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center"><h2>Loading...</h2></div>
      ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((p) => (
                  <div className="product-card" key={p._id}>
                    <div className="product-image-container">
                      <img 
                        src={p.photo} 
                        alt={p.name} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/250?text=No+Image"; }}
                      />
                    </div>
                    <div className="product-details">
                      <h5 className="product-title">{p.name}</h5>
                      <p className="product-description">{p.description.substring(0, 60)}...</p>
                      <div className="product-footer">
                        <span className="product-price">₹{p.price}</span>
                        {getQuantity(p._id) > 0 ? (
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => removeFromCart(p._id)}
                            >
                              -
                            </button>
                            <span className="mx-2 fw-bold">{getQuantity(p._id)}</span>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => addToCart(p)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(p)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
    </div>
  );
};

export default CategoryPage;
