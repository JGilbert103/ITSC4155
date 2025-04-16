import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userportal.css';
import axios from 'axios'
//POTENTIAL LOGIC FOR ADDING TICKETS TO TABLE FROM DB
    
     /** const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({
        firstname: '',
        lastname: '',
        problem: '',
        building: '',
        location: '',
        updates: ''
    });

    useEffect(() => {
        axios.get('/tickets')
            .then(response => {
                setTickets(response.data);
            })
            .catch.error(error => {
                console.log(error);
            });
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/tickets', newTicket)
            .then(response => {
            console.log(response.data);
            setTickets([...tickets, response.data]);
        })
        .catch(error => {
            console.log(error);
        });
    }; */
function UserPortal() {
    const [tickets, setTickets] = useState([])
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
                        {
                            tickets.map(ticket => {
                                return <tr>
                                    <td>N/A</td>
                                    <td>{ticket.lastname}, {ticket.firstname}</td> 
                                    <td>{ticket.building}</td> 
                                    <td>{ticket.problem.substring(0,50)}</td> 
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td><button className='viewTicket'>view</button></td>
                                   
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

export default UserPortal;
