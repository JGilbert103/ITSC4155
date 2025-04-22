import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userportal.css';
import axios from 'axios'

const extractRoomFromLocation = (loc) => {
    const match = loc?.match(/\b(?:Classroom|Dorm)\s+(.+)/i);
    return match ? match[1] : '';
};
const stripRoomFromLocation = (loc) => {
    if (!loc) return '';
    const match = loc.match(/^(Classroom|Dorm)\s+/i);
    return match ? match[1] : loc;
};

function UserPortal() {
    const [tickets, setTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3001/getTickets')
        .then(tickets => setTickets(tickets.data))
        .catch(err => console.log(err))
    }, [])
    

    
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
                    <a className='user-portal-open-database-btn'href="/ticket-database">
                        <button className='user-portal-open-ticket-btn'>Open ticket database</button>  
                    </a>
                </div>
                <div className='right-panel'>
                    <table className='user-tickets-table'>
           
                            <tr>
                                <th>Ticket ID</th>
                                <th>Name</th>
                                <th>Building</th>
                                <th>Problem</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Actions</th>
                            </tr>
                
                            <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={ticket._id.$oid || index}>
                                    <td>{ticket._id?.$oid || 'N/A'}</td>
                                    <td>{ticket.lastname}, {ticket.firstname}</td>
                                    <td>{ticket.building.trim()}</td>
                                    <td>{ticket.problem?.substring(0, 50)}</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>
                                        <button className="view-btn" onClick={() => setSelectedTicket(ticket)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {selectedTicket && (
                        <div className="custom-overlay" onClick={() => setSelectedTicket(null)}>
                            <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                                <h2>Ticket Number: {selectedTicket._id?.$oid || 'N/A'}</h2>
                                <button className="custom-close-btn" onClick={() => setSelectedTicket(null)}>×</button>
                                <div className="custom-content">
                                    <p><strong>Name:</strong> {selectedTicket.firstname} {selectedTicket.lastname}</p>
                                    <p><strong>Building:</strong> {selectedTicket.building.trim()}</p>
                                    <p><strong>Location:</strong> {stripRoomFromLocation(selectedTicket.location)}</p>
                                        {(selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)) && (
                                            <p><strong>Room:</strong> {selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)}</p>
                                        )}
                                    <p><strong>Problem:</strong> {selectedTicket.problem}</p>
                                    <p><strong>Status:</strong> OPEN</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPortal;
