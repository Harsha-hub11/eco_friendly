// Checkout.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [message, setMessage] = useState("");

  // UK‐style address fields
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [postcode, setPostcode] = useState("");

  // Payment fields
  const [cardType, setCardType] = useState("Visa");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [paymentToken, setPaymentToken] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  // Fetch cart items
  useEffect(() => {
    axios
      .get(`http://localhost:3007/cart?user_id=${userId}`)
      .then((res) => {
        const items = res.data.data;
        setCartItems(items);
        const cost = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalCost(cost);
      })
      .catch((err) => console.error("Error fetching cart in checkout:", err));
  }, [userId]);

  const handleCheckout = async () => {
    // Validate address
    if (!fullName || !address1 || !town || !postcode) {
      alert("Please complete all required address fields.");
      return;
    }
    // Validate payment
    if (!cardHolderName || !cardNumber || !expiryMonth || !expiryYear) {
      alert("Please complete all required payment fields.");
      return;
    }

    try {
      const shipping_address = {
        fullName,
        address1,
        address2,
        town,
        postcode,
        country: "United Kingdom",
      };
      const payment = {
        cardType,
        cardHolderName,
        cardNumber,
        expiryMonth,
        expiryYear,
        paymentToken,
      };
      const res = await axios.post("http://localhost:3007/checkout", {
        user_id: userId,
        shipping_address,
        payment,
      });
      setMessage(`Checkout successful! Your order ID is ${res.data.order_id}`);
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
          {cartItems.map((item) => (
            <li key={item.cart_id}>
              {item.product_name} × {item.quantity} = £
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: £{totalCost.toFixed(2)}</h3>
      </div>

      <div className="shipping-info">
        <h3>Shipping Address</h3>
        <div className="address-grid">
          <div className="form-group">
            <label>
              Full Name<span className="required">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Address Line 1<span className="required">*</span>
            </label>
            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address Line 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Town/City<span className="required">*</span>
            </label>
            <input
              type="text"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Postcode<span className="required">*</span>
            </label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="payment-info">
        <h3>Payment Details</h3>
        <div className="address-grid">
          <div className="form-group">
            <label>
              Card Type<span className="required">*</span>
            </label>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option>Visa</option>
              <option>MasterCard</option>
              <option>Amex</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Cardholder Name<span className="required">*</span>
            </label>
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Card Number<span className="required">*</span>
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
              placeholder="xxxx-xxxx-xxxx-1234"
            />
          </div>

          <div className="form-group">
            <label>
              Expiry Month<span className="required">*</span>
            </label>
            <input
              type="text"
              value={expiryMonth}
              onChange={(e) => setExpiryMonth(e.target.value)}
              placeholder="MM"
              maxLength={2}
            />
          </div>

          <div className="form-group">
            <label>
              Expiry Year<span className="required">*</span>
            </label>
            <input
              type="text"
              value={expiryYear}
              onChange={(e) => setExpiryYear(e.target.value)}
              placeholder="YYYY"
              maxLength={4}
            />
          </div>

          <div className="form-group">
            <label>Payment Token</label>
            <input
              type="text"
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
              placeholder="Optional gateway token"
            />
          </div>
        </div>
      </div>

      <button onClick={handleCheckout} className="checkout-button">
        Proceed with Checkout
      </button>
    </div>
  );
};

export default Checkout;
