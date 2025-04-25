import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/adminportal.css';
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
    3: "Done"
}




function AdminPortal() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [photo, setPhoto] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/getTickets')
            .then(response => setTickets(response.data))
            .catch(err => console.log(err));
    }, []);

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
                    {/* <a href='admin-settings'>
                        <button className='settings-btn'>Admin Settings</button>
                    </a> */}
                </div>
                <div className='right-panel'>
                    <table className='admin-tickets-table'>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Name</th>
                                <th>Building</th>
                                <th>Problem</th>
                                <th>Status</th>
                                <th>Date Submitted</th>
                                <th>Photo</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={ticket._id.$oid || index}>
                                    <td>{ticket.ticketid || 'N/A'}</td>
                                    <td>{ticket.lastname}, {ticket.firstname}</td>
                                    <td>{ticket.building.trim()}</td>
                                    <td>{ticket.problem?.substring(0, 50)}</td>
                                    <td>{status[ticket.status] || 'N/A'}</td>
                                    {/*gpt*/}
                                    <td>{ticket.createdAt ? new Date(ticket.createdAt).toISOString().split('T')[0] : 'N/A'}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => setPhoto(ticket)}>View</button>
                                    </td>
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
                                <h2>Ticket Number: {selectedTicket.ticketid || 'N/A'}</h2>
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

                    {photo && (
                        <div className="custom-overlay" onClick={() => setPhoto(null)}>
                            <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                                <h2>Ticket Number: {photo.ticketid || 'N/A'}</h2>
                                <button className="custom-close-btn" onClick={() => setPhoto(null)}>×</button>
                                <div className="custom-content">
                                  { !photo.photo ? 'No Image Found' : <img width={400} height={400} src={photo.photo}></img>}
                                </div>
                            </div>
                        </div>
                    )}  
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;
