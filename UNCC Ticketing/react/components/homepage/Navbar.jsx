import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/navbar.css'
import {Sling as Hamburger} from 'hamburger-react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react'
import { useAuth } from '../../src/App';



function Navbar () {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
  
    const handleLogout = (e) => {
        e.preventDefault();
    
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    localStorage.setItem('userEmail', '');

    console.log("Logout successful! Redirecting...");

    navigate('/');
    
  };

    const [isOpen, setOpen] = useState(false)
    

  return (
    <>
    <header id="site-header">
        <section id="niner">
            <div className="container">
                <a></a>
                <div className="site">
                    <h1 className="site-title">
                        <NavLink to="/" className="site-logo-link">
                        <img src="../src/assets/sadnorm.svg" className="site-logo" alt="Logo" />
                        </NavLink>
                        <NavLink to="/" className="site-title-link">Niner Maintenance</NavLink>
                        {!isAuthenticated ? (
                            <div className='navbarButtons'>
                                <a href="/login">
                                <button className='navbarLogin'>Login</button>
                                </a>
                            </div>
                        ) : (
                            <div className='navbarButtons'>
                                <button className="navbarLogout" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                        
                    </h1>
                </div>
                <Hamburger color="#FFFFFF" toggled={isOpen} toggle={setOpen} />
            </div>
        </section>
        <nav className={isOpen ? "burger-menu show-menu" : "burger-menu"} id="nav-menu" >
            <div className="container">
                <ul id="nav-menu-1" className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/about">About</NavLink>
                        </li>
                    <li className="nav-item">
                    <NavLink to="/faq">FAQ</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/userportal">User Portal</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/adminportal">Admin Portal</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
   
    </>
  )
}


export default Navbar