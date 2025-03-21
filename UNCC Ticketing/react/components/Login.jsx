import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/App'; 
import '../css/login.css';

function Login() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { setIsAdmin } = useAuth();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    } /** else if (!email.endsWith('@uncc.edu') || !email.endsWith('@charlotte.edu')) {
      setError('Access restricted to UNCC students and staff only.');
      return;
    } */
    if (email.startsWith('admin'))
    {
      setIsAdmin(true);
    }

    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userEmail', email);

    console.log("Login successful! Redirecting...");

    navigate('/');
    
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
