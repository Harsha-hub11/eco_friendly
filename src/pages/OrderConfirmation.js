import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Expecting order_id passed in the state from the checkout component
  const { order_id } = location.state || {};

  if (!order_id) {
    return (
      <div className="order-confirmation-container">
        <h2>No Order Found</h2>
        <p>It looks like there is no order information available.</p>
        <button onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  const handleGoToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase!</p>
      <p>Your Order ID is: <strong>{order_id}</strong></p>
      <button onClick={handleGoToShop}>Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
