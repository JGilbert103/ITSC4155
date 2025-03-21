import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userportal.css';

function UserPortal() {
    return (
        <div className='user-portal-container'>
            <div className='user-portal-title'>
                <h1>Welcome Home Niners</h1>
            </div>
            <div className='user-portal-content'>
                <div className='user-portal-left-panel'>
                    <a className='user-portal-open-ticket-btn'href="/ticket">
                        <button className='user-portal-open-ticket-btn' >Submit a New Ticket</button>
                    </a>                        
                    <a className='user-portal-view-details-btn'href="/ticketdatabase">
                        <button className='user-portal-view-details-btn'>View Ticket Details</button>
                    </a>  
                </div>
                <div className='user-portal-right-panel'>
                    <table className='user-portal-tickets-table'>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12345</td>
                                <td>Lightbulb Broken</td>
                                <td>Open</td>
                                <td>2024-10-31</td>
                            </tr>
                            <tr>
                                <td>12346</td>
                                <td>Chair missing</td>
                                <td>Closed</td>
                                <td>2024-10-30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserPortal;
