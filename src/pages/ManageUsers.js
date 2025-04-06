import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    address: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users from the backend API
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3007/admin/users');
      setUsers(res.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3007/admin/users/${editingId}`, form);
      setEditingId(null);
      setForm({
        user_name: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        address: '',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Populate the form with the selected user's data for editing
  const handleEdit = (user) => {
    setEditingId(user.user_id);
    setForm({
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_no: user.mobile_no,
      address: user.address,
    });
  };

  // Delete a user by their user_id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3007/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Filter users based on search term (by username or email)
  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Manage Users</h2>

      {/* Search Filter */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="mobile_no"
          value={form.mobile_no}
          onChange={handleChange}
          placeholder="Mobile No"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">{editingId ? 'Update' : 'Update'} User</button>
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.mobile_no}</td>
                <td>{user.address}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
