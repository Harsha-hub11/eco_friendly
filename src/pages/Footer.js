import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} EcoShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
