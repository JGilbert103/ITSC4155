import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/home.css';
import WelcomeNorm from "../../src/assets/WelcomePageNorm.gif";

function Home (){

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return(
        <div className='homebody'>
            <div className='welcome'>
                <h1>Welcome to Niner Maintenance!</h1>
                <p>- Your one-stop solution for maintenance requests and support! -</p>
            </div>
            <img src={WelcomeNorm} alt="Welcome Norm" className="homeGif" />
            {!isAuthenticated ? (
                <div className='buttons'>
                    <a href="/login">
                    <button className='homeLogin'>Login</button>
                    </a>
                </div>
            ) : (
                <div className='buttons'>
                    <a href="/userportal">
                    <button className='homePortal'>Go To User Portal</button>
                    </a>
                </div>
        )}
        </div>
    );
}

export default Home;