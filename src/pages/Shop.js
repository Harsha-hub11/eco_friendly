import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3007/products")
      .then((response) => {
        console.log("API Response:", response.data.data);  // Check if data is correct
        setProducts(response.data.data); // Set the correct data from API response
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="shop-container">
      <section className="shop-header">
        <h1>Shop Eco-Friendly Products</h1>
        <p>Browse through our collection of sustainable, high-quality products.</p>
      </section>

      <section className="product-list">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} className="product-card">
              <img
                src={`http://localhost:3007/uploads/${product.product_image}`}
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>{product.description}</p>
                <span className="price">£{product.price}</span>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </section>
    </div>
  );
};

export default Shop;
