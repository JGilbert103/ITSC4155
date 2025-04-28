import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userportal.css';
import axios from 'axios';

const extractRoomFromLocation = (loc) => {
    const match = loc?.match(/\b(?:Classroom|Dorm)\s+(.+)/i);
    return match ? match[1] : '';
};

const stripRoomFromLocation = (loc) => {
    if (!loc) return '';
    const match = loc.match(/^(Classroom|Dorm)\s+/i);
    return match ? match[1] : loc;
};

const status = {
    1: "Open",
    2: "In Progress",
    3: "Closed"
};

function UserPortal() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [userPhoto, setPhoto] = useState(null);
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        axios.get('http://localhost:3001/userTickets', {
            headers:{
                'Authorization' : `Bearer ${userEmail}`
            }
        })
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
                    <a className='user-portal-open-ticket-btn' href="/ticket">
                        <button className='user-portal-open-ticket-btn'>Submit a New Ticket</button>
                    </a>
                    <a className='user-portal-open-database-btn' href="/UserTicketDatabase">
                        <button className='user-portal-open-ticket-btn'>Open Ticket Database</button>
                    </a>
                </div>
                <div className='right-panel'>
                    {tickets.length > 0 ? (
                        <table className='user-tickets-table'>
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Name</th>
                                    <th>Building</th>
                                    <th>Problem</th>
                                    <th>Status</th>
                                    <th>Date Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket, index) => (
                                    <tr key={ticket._id?.$oid || index}>
                                        <td>{ticket.ticketid || 'N/A'}</td>
                                        <td>{ticket.lastname}, {ticket.firstname}</td>
                                        <td>{ticket.building.trim()}</td>
                                        <td>{ticket.problem?.substring(0, 50)}</td>
                                        <td>{status[ticket.status] || 'N/A'}</td>
                                        <td>{ticket.createdAt ? new Date(ticket.createdAt).toISOString().split('T')[0] : 'N/A'}</td>
                                        <td>
                                            <button className="view-btn" onClick={() => setSelectedTicket(ticket)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-tickets-message">
                            <h2>No tickets found.</h2>
                        </div>
                    )}

                    {selectedTicket && (
                                <div className="custom-overlay" onClick={() => setSelectedTicket(null)}>
                                <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                                    <button className="custom-close-btn" onClick={() => setSelectedTicket(null)}>×</button>
                                    <h2>Ticket #{selectedTicket.ticketid || 'N/A'}</h2>
                                    <div className="custom-content">
                                    <p><strong>Name:</strong> {selectedTicket.firstname} {selectedTicket.lastname}</p>
                                    <p><strong>Building:</strong> {selectedTicket.building.trim()}</p>
                                    <p><strong>Location:</strong> {stripRoomFromLocation(selectedTicket.location)}</p>
                                    {(selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)) && (
                                        <p><strong>Room:</strong> {selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)}</p>
                                    )}
                                    <p><strong>Problem:</strong> {selectedTicket.problem}</p>
                                    <p><strong>Status:</strong> {status[selectedTicket.status] || 'N/A'}</p>
                                    <p><strong>Date Submitted:</strong> {selectedTicket.createdAt ? new Date(selectedTicket.createdAt).toLocaleDateString() : 'N/A'}</p>
                                    <div className="ticket-photo">
                                        {!selectedTicket.photo ? (
                                        <p>No Image Found</p>
                                        ) : (
                                        <img src={selectedTicket.photo} alt="Ticket Issue" />
                                        )}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            )}

                    {userPhoto && (
                        <div className="custom-overlay" onClick={() => setPhoto(null)}>
                            <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                                <h2>Ticket Number: {userPhoto.ticketid || 'N/A'}</h2>
                                <button className="custom-close-btn" onClick={() => setPhoto(null)}>×</button>
                                <div className="custom-content">
                                    {!userPhoto.photo ? (
                                        'No Image Found'
                                    ) : (
                                        <img width={400} height={400} src={userPhoto.photo} alt="Ticket" />
                                    )}
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
