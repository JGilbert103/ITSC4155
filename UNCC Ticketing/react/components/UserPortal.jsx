import React from 'react';
import { NavLink } from 'react-router-dom'
import '../css/userportal.css'


function UserPortal (){
    return(
        <div>
            <div className='title'>
                <h1>Welcome Home Niners</h1>
            </div>
            <div className='select'>
                <h2>Select an option</h2>
            </div>
            <div>
                <ul className='options'>
                    <li className='newtick'>
                        <NavLink to="/ticket"><h1>Open a ticket</h1></NavLink>
                    </li>
                    <li className='viewtick'>
                        <NavLink to="../components/UserTickets"><h1>View your tickets</h1></NavLink>
                    </li>
                    <li className='faqs'>
                        <NavLink to="/faq"><h1>FAQs</h1></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserPortal;