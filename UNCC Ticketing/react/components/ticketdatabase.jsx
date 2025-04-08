import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/ticketdatabase.css';
import {useEffect, useState} from 'react';


function TicketDatabase() {
    const [buildingname, setBuildingname] = useState([]) 
    useEffect(() =>{
            fetch("/buildings.txt")
                .then(response => response.text())
                .then(text => setBuildingname(text.split("\n")))     
        }, []);
        const [place, setPlace] = useState([])
        
            useEffect(() =>{
                fetch("/locations.txt")
                    .then(response => response.text())
                    .then(text => setPlace(text.split("\n")))
            }, []);

                const [firstname, setFirstName] = useState('')
                const [lastname, setLastName] = useState('')
                const [problem, setProblem] = useState('')
                const [building, setBuilding] = useState('')
                const [location, setLocation] = useState('All')
                const [updates, setUpdates] = useState('')
                const [image, setImage] = useState(null)
    return (
        <div className='fullPage'>
            <div className='leftPanel'>
                <div className='filtersMain'>
                    <ul className='filters'>
                        <li className='buttonObject'><a href='adminportal'><button className='backButton'>&lt;- Back</button></a></li>
                        <li className='searching'>
                            <div className='searchBox'>
                                <input type="text" placeholder="Search By User..." />
                            </div>
                        </li>
                        <li>
                            <div className='buildingName'>
                                <select value={building} onChange={(e) => setBuilding(e.target.value)}> 
                                    <option>Choose one</option>
                                    {buildingname.map((name, i) =>(
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='listedTickets'>
                            <tr>
                                <td>1</td>
                                <td>Gilbert, Jake</td>
                                <td>Fretwell</td>
                                <td>Bathroom</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Shugarman, Tess</td>
                                <td>Colvard</td>
                                <td>Hallway</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Masangkay, Mico</td>
                                <td>Denny</td>
                                <td>Classroom</td>
                                <td><a href=''><button className='viewButton'>view</button></a></td>
                            </tr>
                            <tr>
                                <td>4</td>
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
