import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/adminportal.css';
import axios from 'axios'

function AdminPortal() {
    const [tickets, setTickets] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/getTickets')
        .then(tickets => setTickets(tickets.data))
        .catch(err => console.log(err))
    }, [])
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
           
                            <tr>
                                <th>Ticket ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Problem</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Actions</th>
                            </tr>
                
                        <tbody>
                        {
                            tickets.map(ticket => {
                                return <tr>
                                    <td>N/A</td>
                                    <td>{ticket.firstname}</td> 
                                    <td>{ticket.lastname}</td> 
                                    <td>{ticket.problem}</td> 
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                   
                                </tr>
                                        
                                    })
                                }
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