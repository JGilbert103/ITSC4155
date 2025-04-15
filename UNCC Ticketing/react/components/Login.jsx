import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/App'; 
import '../css/login.css';
import { set } from 'mongoose';
import axios from 'axios';
//import userModel from '../mongodb/schemas/user';

function Login() {
  // State to store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { setIsAdmin } = useAuth();

  
  const handleSubmit = async (req, res) => {
    e.preventDefault();

      const {email, password} = req.body
      const user = await userModel.findOne({email})

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
      if (email.toUpperCase().startsWith('ADMIN'))
      {
        setIsAdmin(true);
      }

      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('userEmail', email);

      console.log("Login successful! Redirecting...");

      axios.post('http://localhost:3001/login', {email: email, password: password})
      .then((data) =>{
          console.log(data)
          console.log(email, password)
          setEmail('')
          setPassword('')
      })    

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
