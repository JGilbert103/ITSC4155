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
                    <ul>
                        <li className='ticketHeader'>Name: Building: Location:</li>
                        <ul className='listedTickets'>
                            <li>Gilbert, Jake Fretwell Bathroom <a href=''><button className='viewButton'>view</button></a></li>
                            <li>Shugarman, Tess Colvard Hallway <a href=''><button className='viewButton'>view</button></a></li>
                            <li>Masangkay, Mico Denny Classroom <a href=''><button className='viewButton'>view</button></a></li>
                            <li>Freeman, Danielle Prospector Bathroom <a href=''><button className='viewButton'>view</button></a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TicketDatabase;
