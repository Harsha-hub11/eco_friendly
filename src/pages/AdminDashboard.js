import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: '',
    price: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch all products from the server
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3007/products');
      setProducts(res.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to create or update a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', form.product_name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    if (file) {
      formData.append('product_image', file);
    }

    try {
      if (editingId) {
        // Update existing product
        await axios.put(`http://localhost:3007/products/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Create a new product
        await axios.post('http://localhost:3007/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      // Reset the form
      setForm({ product_name: '', price: '', description: '' });
      setFile(null);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  // Populate the form for editing a product
  const handleEdit = (product) => {
    setForm({
      product_name: product.product_name,
      price: product.price,
      description: product.description,
    });
    setEditingId(product.product_id);
  };

  // Delete a product by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="file"
          name="product_image"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.product_id}>
              <td>{prod.product_id}</td>
              <td>{prod.product_name}</td>
              <td>{prod.price}</td>
              <td>{prod.description}</td>
              <td>
                {prod.product_image && (
                  <img
                    src={`http://localhost:3007/uploads/${prod.product_image}`}
                    alt={prod.product_name}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button onClick={() => handleDelete(prod.product_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
