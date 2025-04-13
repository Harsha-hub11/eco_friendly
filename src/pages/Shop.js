import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get("http://localhost:3007/products")
      .then((response) => {
        console.log("API Response:", response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort filtered products based on price
  let sortedProducts = [...filteredProducts];
  if (sortOrder === "asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Function to add a product to the cart
  const addToCart = async (product) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      const payload = {
        product_id: product.product_id,
        quantity: 1,
        user_id: userId,
      };
      await axios.post("http://localhost:3007/cart", payload);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart.");
    }
  };

  return (
    <div className="shop-container">
      <section className="shop-header">
        <h1>Shop Eco-Friendly Products</h1>
        <p>Browse through our collection of sustainable, high-quality products.</p>
      </section>

      <section className="shop-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </section>

      <section className="product-list">
        {sortedProducts && sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
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
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
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
