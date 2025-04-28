import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContext'; 
import '../css/login.css';
import axios from 'axios';
// import { set } from 'mongoose';
//import userModel from '../mongodb/schemas/user';

function Login() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');

      // validating that the email is a @charlotte or @uncc email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(charlotte|uncc)\.edu$/;
      if (!emailRegex.test(email)) {
        setError('Only those with a UNCC email are authorized to access this application.');
        return;
      }

      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      } 

      try {
        setLoading(true); 

        const response = await axios.post('http://localhost:3001/login', {
          email: email,
          password: password
        });

        if (response.data) {
          console.log("Login successful!", response.data);
          localStorage.setItem('email', email)

          const userRole = response.data.role || 1;

          login(email, userRole);

          setEmail('');
          setPassword('');

          if (userRole === 2 || userRole === 3) {
            navigate('/adminportal');
          } else {
            navigate('/home');
          }
        }
      } catch (err) {
        // Handle different error types
      if (err.response) {
        // The server responded with an error status
        if (err.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError('Login failed. Please try again later.');
        }
      } else if (err.request) {
        // No response received
        setError('Server not responding. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
