import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch cart items for display
  useEffect(() => {
    axios.get(`http://localhost:3007/cart?user_id=${userId}`)
      .then(res => {
        setCartItems(res.data.data);
        const cost = res.data.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalCost(cost);
      })
      .catch(err => console.error("Error fetching cart in checkout:", err));
  }, [userId]);

  const handleCheckout = async () => {
    if (!shippingAddress) {
      alert("Please enter your shipping address.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3007/checkout", { user_id: userId, shipping_address: shippingAddress });
      setMessage("Checkout successful! Your order ID is " + res.data.order_id);
      // Redirect to order confirmation page after a delay, or reset the cart view
      setTimeout(() => navigate("/thankyou"), 3000);
    } catch (error) {
      console.error("Error during checkout:", error);
      setMessage("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {message && <p className="message">{message}</p>}
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map(item => (
            <li key={item.cart_id}>
              {item.product_name} x {item.quantity} = £{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: £{totalCost.toFixed(2)}</h3>
      </div>
      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <input 
          type="text" 
          placeholder="Enter shipping address" 
          value={shippingAddress} 
          onChange={e => setShippingAddress(e.target.value)}
        />
      </div>
      <button onClick={handleCheckout} className="checkout-button">
        Proceed with Checkout
      </button>
    </div>
  );
};

export default Checkout;
