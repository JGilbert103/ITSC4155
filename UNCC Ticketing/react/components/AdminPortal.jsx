import React from 'react';
import { NavLink } from 'react-router-dom'
import '../css/adminportal.css'


function AdminPortal (){
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
                        <NavLink to="/ticketdatabase"><h1>View all tickets</h1></NavLink>
                    </li>
                    <li className='viewtick'>
                        <NavLink to="../components/UserTickets"><h1>Something else</h1></NavLink>
                    </li>
                    <li className='faqs'>
                        <NavLink to="../components/FAQ"><h1>I don't know. what else can an admin do?</h1></NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminPortal;