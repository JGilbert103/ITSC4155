import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/adminportal.css';

function AdminPortal() {
    return (
        <div className='admin-portal-container'>
            <div className='title'>
                <h1>Welcome Home Niners</h1>
            </div>
            <div className='portal-content'>
                <div className='left-panel'>
                    <a href='ticket-database'>
                        <button className='view-all-tickets-btn'>View All Tickets</button>
                    </a>
                    <a href='manage-users'>
                        <button className='manage-users-btn'>Manage Users</button>
                    </a>
                    <a href='admin-settings'>
                        <button className='settings-btn'>Admin Settings</button>
                    </a>
                </div>
                <div className='right-panel'>
                    <table className='admin-tickets-table'>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Problem</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                
                            </tr>
                            <tr>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;