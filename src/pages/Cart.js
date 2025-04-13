import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  // Assume the current user's ID is stored in localStorage
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items for the current user
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3007/cart?user_id=${userId}`);
      setCartItems(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  // Remove cart item by cart_id
  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`http://localhost:3007/cart/${cartId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Update cart item quantity via PUT /cart/:id
  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(`http://localhost:3007/cart/${cartId}`, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  // Handlers for increment/decrement
  const increaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    updateQuantity(item.cart_id, newQuantity);
  };

  const decreaseQuantity = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      updateQuantity(item.cart_id, newQuantity);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Navigate to Checkout/Delivery page
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="cart-container">
        <p>Loading cart items...</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.cart_id} className="cart-item-card">
                <img
                  src={`http://localhost:3007/uploads/${item.product_image}`}
                  alt={item.product_name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product_name}</h3>
                  <p>{item.description}</p>
                  <p>Price: £{item.price}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => decreaseQuantity(item)} 
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQuantity(item)} 
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.cart_id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total Price: £{totalPrice.toFixed(2)}</h3>
            <button className="checkout-button" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
