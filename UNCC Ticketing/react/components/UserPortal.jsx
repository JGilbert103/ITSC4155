import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/userportal.css';

function UserPortal() {

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
                    <a className='user-portal-view-details-btn'href="/ticketdatabase">
                        <button className='user-portal-view-details-btn'>View Ticket Details</button>
                    </a>  
                </div>
                <div className='user-portal-right-panel'>
                    <table className='user-portal-tickets-table'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Problem</th>
                                <th>Building</th>
                                <th>Location</th>
                                <th>Updates</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserPortal;
