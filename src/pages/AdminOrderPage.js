import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminOrderPage.css';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3007/admin/orders');
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch details for a particular order
  const viewOrderDetails = async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:3007/admin/orders/${orderId}`);
      setSelectedOrderDetails(res.data.data);
      setSelectedOrderId(orderId);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const closeOrderDetails = () => {
    setSelectedOrderDetails(null);
    setSelectedOrderId(null);
  };

  return (
    <div className="admin-order-page">
      <h2>Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Order Date</th>
            <th>Total Cost</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_id}</td>
              <td>{order.user_name}</td>
              <td>{order.order_date}</td>
              <td>£{order.total_cost}</td>
              <td>{order.created_at}</td>
              <td>
                <button onClick={() => viewOrderDetails(order.order_id)}>
                  View Details
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrderDetails && (
        <div className="order-details">
          <h3>Order Details for Order #{selectedOrderId}</h3>
          <table className="order-details-table">
            <thead>
              <tr>
                <th>Order Detail ID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrderDetails.map(detail => (
                <tr key={detail.order_details_id}>
                  <td>{detail.order_details_id}</td>
                  <td>{detail.product_id}</td>
                  <td>{detail.product_name}</td>
                  <td>£{detail.price}</td>
                  <td>{detail.description}</td>
                  <td>
                    {detail.product_image && (
                      <img 
                        src={`http://localhost:3007/uploads/${detail.product_image}`}
                        alt={detail.product_name}
                        className="order-product-image"
                      />
                    )}
                  </td>
                  <td>{detail.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="close-button" onClick={closeOrderDetails}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
