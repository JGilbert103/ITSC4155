import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userticketdatabase.css';
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

function TicketDatabase() {
    const [buildingname, setBuildingname] = useState([]);
    const [place, setPlace] = useState([]);
    const [tickets, setTickets] = useState([]);

    const [building, setBuilding] = useState('');
    const [location, setLocation] = useState('All');
    const [roomNumber, setRoomNumber] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/getTickets')
            .then(res => setTickets(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
    
        axios.get('http://localhost:3001/getTickets')
            .then(res => {
                const allTickets = res.data;
                const userTickets = allTickets.filter(ticket => ticket.email === userEmail);
                setTickets(userTickets);
            })
            .catch(err => console.log(err));
    }, []);
    

    useEffect(() => {
        fetch("/buildings.txt")
            .then(response => response.text())
            .then(text => setBuildingname(text.split("\n")));
    }, []);

    useEffect(() => {
        fetch("/locations.txt")
            .then(response => response.text())
            .then(text => {
                const cleaned = text
                    .split("\n")
                    .map(line => line.trim().replace(/:$/, ''))
                    .filter(line => line.length > 0);
                setPlace(cleaned);
            });
    }, []);

    const extractRoomFromLocation = (loc) => {
        const match = loc?.match(/\b(?:Classroom|Dorm)\s+(.+)/i);
        return match ? match[1] : '';
    };

    const getLocationType = (loc) => {
        if (!loc) return '';
        const parts = loc.split(' ');
        return parts[0];
    };

    const filteredTickets = tickets.filter(ticket => {
        const fullName = `${ticket.firstname} ${ticket.lastname}`.toLowerCase();
        const nameMatch = fullName.includes(searchText.toLowerCase());

        const buildingMatch = building === '' || ticket.building === building;

        const locationType = getLocationType(ticket.location);
        const locationMatch = location === 'All' || locationType === location;

        const ticketRoom = ticket.roomnumber || extractRoomFromLocation(ticket.location);
        const roomMatch = (location === 'Classroom' || location === 'Dorm')
            ? ticketRoom.toLowerCase().includes(roomNumber.toLowerCase())
            : true;

        return nameMatch && buildingMatch && locationMatch && roomMatch;
    });

    return (
        <div className='fullPage'>
            <div className='leftPanel'>
                <div className='filtersMain'>
                    <ul className='filters'>
                        <li className='buttonObject'>
                            <a href='userportal'>
                                <button className='backButton'>&lt;- Back</button>
                            </a>
                        </li>

                        <li className='searching'>
                            <div className='searchBox'>
                                <input
                                    type="text"
                                    placeholder="Search By User..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </div>
                        </li>

                        <li>
                            <div className='buildingName'>
                                <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                                    <option value="">Select Building...</option>
                                    {buildingname.map((name, i) => (
                                        <option key={i} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </li>

                        <li>
                            <div className='Places'>
                                <label>
                                    All:
                                    <input
                                        type="radio"
                                        value="All"
                                        name="location"
                                        checked={location === "All"}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </label>

                                {place.map((name, i) => (
                                    <label key={i}>
                                        {name}
                                        <input
                                            type="radio"
                                            value={name}
                                            name="location"
                                            checked={location === name}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </label>
                                ))}

                                {(location === "Classroom" || location === "Dorm") && (
                                    <div className="roomNumber">
                                        <label>Room Number:
                                            <br />
                                            <input
                                                type="text"
                                                value={roomNumber}
                                                onChange={(e) => setRoomNumber(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='rightPanel'>
                <div className='allTickets'>
                    <table>
                        <thead>
                            <tr className='ticketHeader'>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Building</th>
                                <th>Location</th>
                                <th>Room</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='listedTickets'>
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket, index) => {
                                    const room = ticket.roomnumber || extractRoomFromLocation(ticket.location);
                                    return (
                                        <tr key={index}>
                                            <td>{ticket.ticketid || 'N/A'}</td>
                                            <td>{ticket.lastname}, {ticket.firstname}</td>
                                            <td>{ticket.building}</td>
                                            <td>{getLocationType(ticket.location)}</td>
                                            <td>{room || ''}</td>
                                            <td>
                                                <button
                                                    className='viewButton'
                                                    onClick={() => setSelectedTicket(ticket)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No tickets found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
        </div>
    );
}

export default TicketDatabase;