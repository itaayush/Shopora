import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/cart';

const HomePage = () => {
  const [products, setProducts] = useState([]);
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
    console.log(myCart);
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
    return item ? item.quantity : 0;
  };

  
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/v1/product/get-product');
      
      if (data?.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="home-page">
      <div className="banner-container">
        <h1>Welcome to Our Store</h1>
        <p>Discover our exclusive collection of Laptops and Watches</p>
      </div>
      
      {loading ? (
        <div className="text-center"><h2>Loading...</h2></div>
      ) : (
        <div className="product-grid">
          {products?.map((p) => (
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
    </div>
  );
};

export default HomePage;
