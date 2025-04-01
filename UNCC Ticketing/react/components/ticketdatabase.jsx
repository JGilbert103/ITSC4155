import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/ticketdatabase.css';

function TicketDatabase() {
    return (
        <div className='fullPage'>
            <div className='leftPanel'>
                <div className='filters'>
                    <ul>
                        <li>Search</li>
                        <li>Building</li>
                        <li>Location</li>
                    </ul>
                </div>
            </div>
            <div className='rightPanel'>
                <div className='allTickets'>
                    <table>
                        <thead>
                            <tr className='ticketHeader'>
                                <th>Name</th>
                                <th>Building</th>
                                <th>Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='listedTickets'>
                            <tr>
                                <td>Gilbert, Jake</td>
                                <td>Fretwell</td>
                                <td>Bathroom</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>Shugarman, Tess</td>
                                <td>Colvard</td>
                                <td>Hallway</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>Masangkay, Mico</td>
                                <td>Denny</td>
                                <td>Classroom</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>Freeman, Danielle</td>
                                <td>Prospector</td>
                                <td>Bathroom</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TicketDatabase;
