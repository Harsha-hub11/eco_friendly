import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="thankyou-container">
      <h2>Thank You for Your Purchase!</h2>
      <p>You will receive your product soon. Please check your email for further order and shipping details.</p>
      <button onClick={() => navigate('/shop')}>Continue Shopping</button>
    </div>
  );
};

export default ThankYou;
