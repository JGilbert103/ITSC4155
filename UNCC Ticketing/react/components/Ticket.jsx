import React from 'react';
import '../css/ticket.css'
import {useEffect, useState} from 'react';

function Ticket() {
    const [building, setBuilding] = useState([]) 

    useEffect(() =>{
        fetch("/buildings.txt")
            .then(response => response.text())
            .then(text => setBuilding(text.split("\n")))     
    }, []);


    return (
        <>
            <div className="border">
                <div className="form-border" >
                    <form>
                        <div className="first-last-build">
                            <label>First Name:
                                <br/>
                                <input type="text" required />
                            </label>
                            <label>Last Name:
                                <br/>
                                <input type="text" required />
                            </label>
                        
                        <div className="building-location">
                            <div className="building-dropdown">
                                <label>Enter Building Name:</label>
                                <select> 
                                    <option>Choose one</option>
                                    {building.map((name) =>(
                                        <option value={name}>{name}</option>
                                    ))}
                                </select>
                                  
                            </div>
                        </div>
                        </div>
                        

                        <div className="location-type">
                            <label className="location-label">Location:</label> 
                            <div className="location-select">
                                <label> Classroom:
                                    <input type="radio" name="location" value="classroom" />
                                </label>
                                <label>Bathroom:
                                    <input type="radio" name="location" value="bathroom"></input>
                                </label>
                                <label>Main Building:
                                    <input type="radio" name="location" value="main-building"></input>
                                </label>
                                <label>Dorm:
                                    <input type="radio" name="location" value="dorm"></input>
                                </label>
                                <label>Study Area:
                                    <input type="radio" name="location" value="study-area"></input>
                                </label>
                                <label>Other:
                                    <input type="radio" name="location" value="other"></input>
                                </label>
                            </div>
                        </div>

                        <div className="description">
                            <label>Please Describe Issue and Location:
                                <br></br>
                                <textarea name="description"></textarea>
                            </label>
                        </div>


                        <div className="add-photo">
                            <label>Import photo of issue and location:
                                <input type="file" name="photo" accept="image/*"></input>
                            </label>
                        </div>

                        <div className="updates">
                            <label>Do you want email updates on this ticket to your school email?
                                <input type="checkbox"></input>
                            </label>
                        </div>

                        <button>Submit Ticket</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Ticket