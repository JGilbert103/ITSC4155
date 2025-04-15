import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/ticketdatabase.css';
import {useEffect, useState} from 'react';
import axios from 'axios';


function TicketDatabase() {
    const [buildingname, setBuildingname] = useState([]);
    const [place, setPlace] = useState([]);
    const [tickets, setTickets] = useState([]);

    // Filter state
    const [building, setBuilding] = useState('');
    const [location, setLocation] = useState('All');
    const [roomNumber, setRoomNumber] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/getTickets')
            .then(res => setTickets(res.data))
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
            .then(text => setPlace(text.split("\n")));
    }, []);

    const filteredTickets = tickets.filter(ticket => {
        const fullName = `${ticket.firstname} ${ticket.lastname}`.toLowerCase();
        const nameMatch = fullName.includes(searchText.toLowerCase());

        const buildingMatch = building === '' || ticket.building === building;
        const locationMatch = location === 'All' || ticket.location === location.replace(':', '');

        const roomMatch =
            (location === 'Classroom' || location === 'Dorm')
                ? ticket.roomnumber?.toLowerCase().includes(roomNumber.toLowerCase())
                : true;

        return nameMatch && buildingMatch && locationMatch && roomMatch;
    });

    return (
        <div className='fullPage'>
            <div className='leftPanel'>
                <div className='filtersMain'>
                    <ul className='filters'>
                        <li className='buttonObject'>
                            <a href='adminportal'>
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
                                    <div className="room-number">
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
                                filteredTickets.map((ticket, index) => (
                                    <tr key={index}>
                                        <td>N/A</td>
                                        <td>{ticket.lastname}, {ticket.firstname}</td>
                                        <td>{ticket.building}</td>
                                        <td>{ticket.location}</td>
                                        <td>{ticket.roomnumber || 'N/A'}</td>
                                        <td>
                                            <a href=''>
                                                <button className='viewButton'>view</button>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No tickets found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TicketDatabase;
