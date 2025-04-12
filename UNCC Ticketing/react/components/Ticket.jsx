import React from 'react';
import '../css/ticket.css';
import {useEffect, useState} from 'react';
import axios from 'axios';


function Ticket() {
    const url = 'mongodb+srv://danielleff03:9tZXrhKqsi3Mn2S8@cluster0.zekhtoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    const [buildingname, setBuildingname] = useState([]) 
    const [place, setPlace] = useState([])
    const [roomNumber, setRoomNumber] = useState('');

    useEffect(() =>{
        fetch("/locations.txt")
            .then(response => response.text())
            .then(text => setPlace(text.split("\n")))
    }, []);

    useEffect(() =>{
        fetch("/buildings.txt")
            .then(response => response.text())
            .then(text => setBuildingname(text.split("\n")))     
    }, []);

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [problem, setProblem] = useState('')
    const [building, setBuilding] = useState('')
    const [location, setLocation] = useState('')
    const [updates, setUpdates] = useState('')
    const [image, setImage] = useState(null)

    const submit = (e) =>{
        e.preventDefault()
        const fullLocation = (location === "Classroom" || location === "Dorm") && roomNumber
        ? `${location} ${roomNumber}`
        : location;

        console.log("User input:", {
            firstname,
            lastname,
            problem,
            building,
            location: fullLocation,
            updates,
            photo: image,
        });
        
        axios.post('http://localhost:3001/tickets', {firstname: firstname, lastname:lastname, problem: problem, building: building, location: fullLocation, updates:updates, photo:image})
        .then((data) =>{
            console.log(data)
            console.log(firstname, lastname, problem, building, location, updates, image)
            setFirstName('')
            setLastName('')
            setProblem('')
            setBuilding('')
            setLocation('')
            setUpdates(false)
            setImage(null)
        })
            
    }

    return (
        <>
            <div className="border">
                <div className="form-border" >
                    <form onSubmit={submit}> 
                    <div className="return">
                    <a className="back-button" href="/userportal">&larr; Back</a>
                    </div>
                    <div className="first-last-build">
                        <label>First Name:
                            <br/>
                            <input value={firstname} autoFocus name="firstname" onChange={(e) => setFirstName(e.target.value)} type="text" required />
                        </label>
                        <label>Last Name:
                            <br/>
                            <input type="text" required value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                    
                        <div className="building-location">
                            <div className="building-dropdown">
                                <label>Enter Building Name:</label>
                                <select value={building} onChange={(e) => setBuilding(e.target.value)}> 
                                    <option>Choose one</option>
                                    {buildingname.map((name, i) =>(
                                        <option key={i} value={name}>{name}</option>
                                    ))}
                                </select>
                                    
                            </div>
                        </div>
                    </div>
                    
                        <div className="location-type">
                            <label className="location-label">Location:</label> 
                            <div className="location-select">
                                {place.map((name, i) =>(
                                    <label key={i} >{name}
                                        <input value={name.trim().replace(':', '')} id={name} type="radio" name="location" onChange={(e) => setLocation(e.target.value)}></input>
                                    </label>
                                ))}
                            
                            </div>
                        </div>

                        {(location === "Classroom" || location === "Dorm") && (
                        <div className="room-number">
                            <label>Room Number:
                                <br />
                                <input
                                    type="text"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    )}

                        <div className="problem">
                            <label>Please Describe Issue and Location:
                                <br></br>
                                <textarea name="problem" value={problem} onChange={(e) => setProblem(e.target.value)}></textarea>
                            </label>
                        </div>

                        <div className="add-photo">
                            <label>Import photo of issue and location:
                                <input type="file" name="photo" accept="image/*" onChange={(e) => setImage(e.target.files[0])}></input>
                            </label>
                        </div>

                        <div className="updates">
                            <label>Do you want email updates on this ticket to your school email?
                                <input type="checkbox" checked={updates} onChange={(e) => setUpdates(e.target.checked)}></input>
                            </label>
                        </div>
                        <div className='submitTicket'>
                            <button >Submit Ticket</button>
                            {/* <button type="button" onClick={handleSubmit}>Submit Ticket</button> */}
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default Ticket