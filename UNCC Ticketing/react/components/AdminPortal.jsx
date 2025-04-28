import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/adminportal.css';
import axios from 'axios';
import { useAuth } from '../src/AuthContext';

// Utility functions
const extractRoomFromLocation = (loc) => {
  const match = loc?.match(/\b(?:Classroom|Dorm)\s+(.+)/i);
  return match ? match[1] : '';
};

const stripRoomFromLocation = (loc) => {
  if (!loc) return '';
  const match = loc.match(/^(Classroom|Dorm)\s+/i);
  return match ? match[1] : loc;
};

// Status mapping
const status = {
  1: "Open",
  2: "In Progress",
  3: "Closed"
};

function AdminPortal() {
  const { userRole } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getTickets');
      setTickets(response.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = parseInt(e.target.value);
    setEditedStatus(newStatus);
  };

  const handleSaveChanges = async () => {
    if (!selectedTicket || editedStatus === null) return;
  
    try {
    await axios.post('http://localhost:3001/updateTicketStatus', {
        ticketid: selectedTicket.ticketid,
        status: editedStatus
        }, { withCredentials: true });
          
  
      console.log('Status updated successfully!');
  
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.ticketid === selectedTicket.ticketid
            ? { ...ticket, status: editedStatus }
            : ticket
        )
      );
  
      setSelectedTicket(prev => ({
        ...prev,
        status: editedStatus
      }));
  
      setEditedStatus(null);
    } catch (err) {
      console.error('Error updating ticket status:', err);
    }
  };
  
  

  const handleClosePopup = () => {
    setSelectedTicket(null);
    setEditedStatus(null);
  };

  return (
    <div className="admin-portal-container">
      <div className="title">
        <h1>Welcome Home Niners</h1>
      </div>

      <div className="portal-content">
        <div className="left-panel">
          <a href="ticket-database">
            <button className="view-all-tickets-btn">View All Tickets</button>
          </a>

          {userRole === 2 && (
            <a href="manage-users">
              <button className="manage-users-btn">Manage Users</button>
            </a>
          )}
        </div>

        <div className="right-panel">
          <table className="admin-tickets-table">
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
                    <button className="view-btn" onClick={() => {setSelectedTicket(ticket); setEditedStatus(null);}}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Ticket Details Popup */}
          {selectedTicket && (
            <div className="custom-overlay" onClick={handleClosePopup}>
              <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                <h2>Ticket Number: {selectedTicket.ticketid || 'N/A'}</h2>
                <button className="custom-close-btn" onClick={handleClosePopup}>×</button>
                <div className="custom-content">
                  <p><strong>Name:</strong> {selectedTicket.firstname} {selectedTicket.lastname}</p>
                  <p><strong>Building:</strong> {selectedTicket.building.trim()}</p>
                  <p><strong>Location:</strong> {stripRoomFromLocation(selectedTicket.location)}</p>
                  {(selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)) && (
                    <p><strong>Room:</strong> {selectedTicket.roomnumber || extractRoomFromLocation(selectedTicket.location)}</p>
                  )}
                  <p style={{ gridColumn: 'span 2' }}>
                    <strong>Problem:</strong> {selectedTicket.problem}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label><strong>Status:</strong></label>
                    <select
                      value={editedStatus !== null ? editedStatus : selectedTicket.status}
                      onChange={handleStatusChange}
                      className="status-dropdown"
                    >
                      <option value={1}>Open</option>
                      <option value={2}>In Progress</option>
                      <option value={3}>Closed</option>
                    </select>

                    {editedStatus !== null && (
                      <button className="save-status-btn" onClick={handleSaveChanges}>
                        Save Changes
                      </button>
                    )}
                  </div>

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

          {/* Photo Popup */}
          {photo && (
            <div className="custom-overlay" onClick={() => setPhoto(null)}>
              <div className="custom-popup" onClick={(e) => e.stopPropagation()}>
                <h2>Ticket Number: {photo.ticketid || 'N/A'}</h2>
                <button className="custom-close-btn" onClick={() => setPhoto(null)}>×</button>
                <div className="custom-content">
                  {!photo.photo ? (
                    'No Image Found'
                  ) : (
                    <img width={400} height={400} src={photo.photo} alt="Ticket Issue" />
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

export default AdminPortal;
