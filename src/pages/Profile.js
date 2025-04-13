import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile_no: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // Get the current user's ID from localStorage
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3007/user/profile/${userId}`)
        .then((response) => {
          setProfile(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3007/user/profile/${userId}`, profile)
      .then((response) => {
        setMessage('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        setMessage('Error updating profile. Please try again.');
      });
  };

  if (loading) {
    return <div className="profile-container"><p>Loading...</p></div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          name="user_name"
          value={profile.user_name}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="first_name"
          value={profile.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={profile.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="mobile_no"
          value={profile.mobile_no}
          onChange={handleChange}
          placeholder="Mobile Number"
        />
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
