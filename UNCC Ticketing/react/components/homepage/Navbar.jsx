import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/navbar.css'

function Navbar () {
  return (
    <>
    <header id="site-header">
        <section id="identity">
            <div className="container">
                <a></a>
                <div className="site">
                    <h1 className="site-title">
                        <NavLink to="/" className="site-title-link" >Niner Maintenance</NavLink>
                    </h1>
                </div>
            </div>
        </section>
        <nav className="horizontal-menu" id="main-menu">
            <div className="container">
                <ul id="main-menu-1" className="menu-list">
                    <li className="menu-item">
                        <NavLink to="/about">About</NavLink>
                        </li>
                    <li className="menu-item">
                    <NavLink to="/faq">FAQ</NavLink>
                    </li>
                    <li className="menu-item">
                        <NavLink to="/userportal">User Portal</NavLink>
                    </li>
                    <li className="menu-item">
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