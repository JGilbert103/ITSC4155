import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/navbar.css'

function Home (){

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return(
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Niner Maintenance</h1>
            <h2>Your one-stop solution for maintenance requests and support.</h2>
        
        {!isAuthenticated ? (
            <div>
                <a className='loginButton' href="/login">
                <button className='loginButton'>Login</button>
                </a>
            </div>
        ) : (
            <div>
                <a className='userPortalButton' href="/userportal">
                <button className='userPortal'>Go To User Portal</button>
                </a>
            </div>
        )}
        </div>
    );
}

export default Home;