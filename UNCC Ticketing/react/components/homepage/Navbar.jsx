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
                        <a className="site-title-link" href="#home">Niner Maintenance</a>
                    </h1>
                </div>
            </div>
        </section>
        <nav className="horizontal-menu" id="main-menu">
            <div className="container">
                <ul id="main-menu-1" className="menu-list">
                    <li className="menu-item">
                        <a href="#about">About</a>
                        </li>
                    <li className="menu-item">
                    <a href="#faq">FAQ</a>
                    </li>
                    <li className="menu-item">
                    <a href="#submit-ticket">Submit Ticket</a>
                    </li>
                    <li className="menu-item">
                    <a href="#login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
   
    </>
  )
}


export default Navbar