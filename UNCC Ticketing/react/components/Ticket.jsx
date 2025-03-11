import React from 'react';
import '../css/ticket.css'
import {useEffect, useState} from 'react';
import axios from 'axios';

function Ticket() {
    const [building, setBuilding] = useState([]) 
    const [place, setPlace] = useState([])

    useEffect(() =>{
        fetch("/locations.txt")
            .then(response => response.text())
            .then(text => setPlace(text.split("\n")))
    }, []);

    useEffect(() =>{
        fetch("/buildings.txt")
            .then(response => response.text())
            .then(text => setBuilding(text.split("\n")))     
    }, []);

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [buildingname, setBuildingName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [updates, setUpdates] = useState('')

    const handleSubmit = () => {
        if (firstname.length === 0){
            alert("test")
        } else {
            const url = "http://localhost/form.php";

            let fData = new FormDate();
            fData.append("firstname", firstname);
            /*
            fData.append("lastname", lastname);
            fData.append("buildingname", buildingname);
            fData.append("location", location);
            fData.append("description", description);
            fData.append("image", image);
            fData.append("updates", updates);
            */

            axios.post(url, fData)
            .then(response => alert(response.data))
            .catch(error => alert(error));
        }
    }

    return (
        <>
            <div className="border">
                <div className="form-border" >
                    <form>
                        <div className="first-last-build">
                            <label>First Name:
                                <br/>
                                <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" required />
                            </label>
                            <label>Last Name:
                                <br/>
                                <input type="text" required value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                            </label>
                        
                        <div className="building-location">
                            <div className="building-dropdown">
                                <label>Enter Building Name:</label>
                                <select> 
                                    <option>Choose one</option>
                                    {building.map((name) =>(
                                        <option value={buildingname} onChange={(e) => setBuildingName(e.target.value)} id={name}>{name}</option>
                                    ))}
                                </select>
                                  
                            </div>
                        </div>
                        </div>
                    
                        <div className="location-type">
                            <label className="location-label">Location:</label> 
                            <div className="location-select">
                   
                                {place.map((name) =>(
                                    <label value={location} id={name}>{name}
                                        <input type="radio" name="location" onChange={(e) => setLocation(e.target.value)}></input>
                                    </label>
                                ))}
                            
                                {/*
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
                                */}
                            
                            </div>
                        </div>

                        <div className="description">
                            <label>Please Describe Issue and Location:
                                <br></br>
                                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </label>
                        </div>


                        <div className="add-photo">
                            <label>Import photo of issue and location:
                                <input type="file" name="photo" accept="image/*" value={image} onChange={(e) => setImage(e.target.value)}></input>
                            </label>
                        </div>

                        <div className="updates">
                            <label>Do you want email updates on this ticket to your school email?
                                <input type="checkbox" value={updates} onChange={(e) => setUpdates(e.target.value)}></input>
                            </label>
                        </div>

                        <button onclick={handleSubmit}>Submit Ticket</button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Ticket