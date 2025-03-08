import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../css/navbar.css'
import {Sling as Hamburger} from 'hamburger-react'
import { useState, createContext, useContext } from 'react'

function Navbar () {

    const [isOpen, setOpen] = useState(false)

  return (
    <>
    <header id="site-header">
        <section id="niner">
            <div className="container">
                <a></a>
                <div className="site">
                    <h1 className="site-title">
                        <NavLink to="/" className="site-title-link" >Niner Maintenance</NavLink>
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