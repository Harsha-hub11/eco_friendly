import React from "react";
import "./Shop.css";
import caseImage from "./case.jpeg";
import waterBottleImage from "./water-bottle.avif";
import tShirtImage from "./t-shirt.webp";

const Shop = () => {
    const products = [
        {
            id: 1,
            name: "Eco-Friendly Water Bottle",
            price: "$15",
            description: "Keep hydrated with this sustainable water bottle.",
            image: waterBottleImage
        },
        {
            id: 2,
            name: "Biodegradable Phone Case",
            price: "$25",
            description: "Protect your phone with a biodegradable case.",
            image: caseImage
        },
        {
            id: 3,
            name: "Organic Cotton T-shirt",
            price: "$20",
            description: "Soft, comfortable, and eco-friendly.",
            image: tShirtImage
        },
    ];

    return (
        <div className="shop-container">
            <section className="shop-header">
                <h1>Shop Eco-Friendly Products</h1>
                <p>Browse through our collection of sustainable, high-quality products.</p>
            </section>

            <section className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span>{product.price}</span>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Shop;
