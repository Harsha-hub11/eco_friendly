import React, { useState } from 'react'; 
import axios from 'axios';
import './Login.css';
import picture from "./img.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Track if it's login or registration
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle login form submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      userEmail: email,
      Password: password,
    };

    axios.post('http://localhost:3007/eco_friendly/login', loginData)
      .then((response) => {
        if (response.data.status === 200) {
          const { user_id, user_name, token } = response.data.results[0];

          localStorage.setItem('user_id', user_id);
          localStorage.setItem('user_name', user_name);
          localStorage.setItem('token', token);

          window.location.href = '/shop'; // Adjust as needed
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setError('Login failed. Please try again.');
      });
  };

  // Handle registration form submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const registerData = {
      userName,
      firstName,
      lastName,
      email,
      password,
      address,
      mobileNo,
    };

    axios.post('http://localhost:3007/eco_friendly/register', registerData)
      .then((response) => {
        if (response.data.status === 201) {
          setSuccess('Registration successful! Please log in.');
          setError('');
          setIsLogin(true); // Switch to login after registration
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        setError('Registration failed. Please try again.');
      });
  };

  return (
    <div className="custom-body">
      <div className={`wrapper ${isLogin ? '' : 'active'}`}>
        <img src={picture} alt="Background" />
        <h2 className="text-right">Welcome</h2>

        {/* Login Form */}
        {isLogin ? (
          <div className="form-wrapper login">
            <form onSubmit={handleLoginSubmit}>
              <h2>Login</h2>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit">Login</button>
              <div className="sign-link">
                <p>
                  Don't have an account?{' '}
                  <a href="#" onClick={() => setIsLogin(false)}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Registration Form */
          <div className="form-wrapper register">
            <form onSubmit={handleRegisterSubmit}>
              <h2>Register</h2>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="home"></ion-icon>
                </span>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="call"></ion-icon>
                </span>
                <input
                  type="text"
                  placeholder="Mobile No."
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              <button type="submit">Register</button>
              <div className="sign-link">
                <p>
                  Already have an account?{' '}
                  <a href="#" onClick={() => setIsLogin(true)}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
