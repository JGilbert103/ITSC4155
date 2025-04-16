import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../css/navbar.css';
import {Sling as Hamburger} from 'hamburger-react';
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { AuthProvider, useAuth } from '../../src/AuthContext';


function Navbar () {
    const { isAuthenticated, isAdmin, logout, userEmail } = useAuth(); // Use the context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = (e) => {
        e.preventDefault();
        
        // Use the logout function from context
        logout();
        
        console.log("Logout successful! Redirecting...");
        navigate('/');
        setOpen(false);
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.hamburger-react')
      ) {
        setOpen(false);
      }
    };
  
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

    const handleHamburgerClick = (e) => {
        e.stopPropagation(); 
        setOpen(prevState => !prevState); 
    };

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
                <div>
                    <Hamburger toggled={isOpen} toggle={() => setOpen(!isOpen)} color="#FFFFFF" />
                </div>
            </div>
        </section>
        <nav ref={menuRef} className={isOpen ? "burger-menu show-menu" : "burger-menu"} id="nav-menu" >
            <div className="container">
                <ul id="nav-menu-1" className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
                        </li>
                    <li className="nav-item">
                    <NavLink to="/faq" onClick={() => setOpen(false)}>FAQ</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/userportal" onClick={() => setOpen(false)}>User Portal</NavLink>
                    </li>
                    {isAdmin ? (
                        <li className="nav-item">
                        <NavLink to="/adminportal" onClick={() => setOpen(false)}>Admin Portal</NavLink>
                        </li>
                    ) : (
                        <div>
                            
                        </div>
                    )}
                </ul>
            </div>
        </nav>
    </header>
   
    </>
  )
}


export default Navbar;