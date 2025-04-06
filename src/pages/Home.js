import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
    const navigate = useNavigate();

    const handleShopNowClick = () => {
        navigate("/login");
    };

    return (
        <div className="home-container">
            <section className="hero">
                <h1>Sustainable Living, One Product at a Time</h1>
                <p>Shop eco-friendly products and contribute to a greener planet.</p>
                <button onClick={handleShopNowClick}>Get Started</button>
            </section>

            <section className="services">
                <h2>Our Services</h2>
                <div className="services-container">
                    <div className="service-card">
                        <h3>Sustainable Packaging</h3>
                        <p>We use biodegradable and recyclable packaging for all our products.</p>
                    </div>
                    <div className="service-card">
                        <h3>Ethically Sourced Products</h3>
                        <p>All our items are sourced from responsible and sustainable suppliers.</p>
                    </div>
                    <div className="service-card">
                        <h3>Carbon-Neutral Shipping</h3>
                        <p>We offset carbon emissions for every order you place.</p>
                    </div>
                </div>
            </section>

            <section className="reviews">
                <h2>Customer Reviews</h2>
                <div className="reviews-container">
                    <div className="review-card">
                        <p>"Great quality products! Love their sustainable packaging."</p>
                        <h4>- Emily R.</h4>
                    </div>
                    <div className="review-card">
                        <p>"Fast shipping and amazing customer service!"</p>
                        <h4>- John D.</h4>
                    </div>
                    <div className="review-card">
                        <p>"I love supporting a brand that cares about the environment!"</p>
                        <h4>- Sarah W.</h4>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
