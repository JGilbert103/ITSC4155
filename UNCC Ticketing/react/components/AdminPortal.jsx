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
                    <button className='view-all-tickets-btn'>View All Tickets</button>
                    <button className='manage-users-btn'>Manage Users</button>
                    <button className='settings-btn'>Admin Settings</button>
                </div>
                <div className='right-panel'>
                    <table className='admin-tickets-table'>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>User</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>12345</td>
                                <td>John Doe</td>
                                <td>Lightbulb Broken</td>
                                <td>Open</td>
                                <td>2024-10-31</td>
                                <td><button className='view-btn'>View</button></td>
                            </tr>
                            <tr>
                                <td>12346</td>
                                <td>Jane Smith</td>
                                <td>Chair missing</td>
                                <td>Closed</td>
                                <td>2024-10-30</td>
                                <td><button className='view-btn'>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;