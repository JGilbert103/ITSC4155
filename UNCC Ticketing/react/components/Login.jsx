import React, { useState } from 'react';
import '../css/login.css';

function Login() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (ensure fields aren't empty, check that it is a @uncc.edu or @charlotte.edu email) 
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

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
