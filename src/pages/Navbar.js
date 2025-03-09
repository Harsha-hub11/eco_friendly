import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">

                <a href="/" className="nav-logo">
                    EcoShop
                </a>
                <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </div>

                <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
