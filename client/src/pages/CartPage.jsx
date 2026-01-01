import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  
  const totalPrice = () => {
    try {
      let total = cart?.reduce();
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  const addToCart = (product) => {
    let myCart = [...cart];
    const existingItemIndex = myCart.findIndex((item) => item._id === product._id);
    
    if (existingItemIndex !== -1) {
      myCart[existingItemIndex].quantity = (myCart[existingItemIndex].quantity || 1) + 1;
    }
    
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const removeOneFromCart = (pid) => {
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

  
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleCheckout = async () => {
    try {
      if (!auth?.token) {
        navigate("/login", { state: "/cart" });
        return;
      }
      const { data } = await axios.post("/api/v1/order/create-order", {
        cart,
      });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error in Checkout");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={p.photo}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : ₹{p.price}</p>
                  <div className="d-flex align-items-center mb-2">
                    <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => removeOneFromCart(p._id)}
                    >
                        -
                    </button>
                    <span className="mx-2 fw-bold">{p.quantity || 1}</span>
                    <button 
                        className="btn btn-secondary btn-sm" 
                        onClick={() => addToCart(p)}
                    >
                        +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                </div>
              </>
            ) : null}
            <div className="mt-2">
              {cart?.length > 0 && (
                <button
                  className="btn btn-primary"
                  onClick={handleCheckout}
                  
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default CartPage;
