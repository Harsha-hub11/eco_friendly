import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token') !== null;
  const userId = localStorage.getItem('user_id');

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          EcoShop
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        {/* Nav Items */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              {userId === '1' ? (
                // Admin links
                <>
                  <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                  <li><Link to="/manage-users">Manage Users</Link></li>
                  <li className="logout-li">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                  </li>
                </>
              ) : (
                // Non-admin (user) links
                <>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li className="logout-li">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
