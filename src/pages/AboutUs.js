import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="about-us">
        <h1>About EcoShop</h1>
        <p>
          At EcoShop, we are committed to providing sustainable, eco-friendly products
          that help you live a greener lifestyle. Our mission is to reduce waste,
          support ethical sourcing, and offer high-quality goods that are good for both
          you and the planet.
        </p>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>
          We aim to create a future where everyone can easily access eco-friendly products
          that make a positive impact on the environment. Join us in our mission to make the
          world a cleaner, greener place.
        </p>
      </section>

      <section className="values">
        <h2>Our Core Values</h2>
        <div className="values-container">
          <div className="value-card">
            <h3>Eco-Friendly</h3>
            <p>We prioritize environmentally conscious products and sustainable practices in every step.</p>
          </div>
          <div className="value-card">
            <h3>Ethical Sourcing</h3>
            <p>Our products are sourced from suppliers who uphold high ethical standards and responsible practices.</p>
          </div>
          <div className="value-card">
            <h3>Community Impact</h3>
            <p>We actively engage with communities and support initiatives that focus on environmental well-being.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
