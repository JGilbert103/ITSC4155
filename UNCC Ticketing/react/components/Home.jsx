import React from 'react';
import '../css/home.css'

function Home() {
    return (
        <>
            <div className="border">
                <div className="form-border" >
                    <form>

                        <div className="first-last">
                            <label>First Name:
                                <br/>
                                <input type="text" required />
                            </label>
                            <label>Last Name:
                                <br/>
                                <input type="text" required />
                            </label>
                        </div>

                        <div className="building-location">
                            <div className="building-dropdown">
                                <label>Enter Building Name:</label>
                                <select>
                                    <option>Choose one</option>
                                    <option>Athletic Training & Academic Center</option>
                                    <option>Atkins Library</option>
                                    <option>Barnhardt Student Activity Center/Halton Arena</option>
                                    <option>Bioinformatic Building</option>
                                    <option>Barnard</option>
                                    <option>Burson</option>
                                    <option>Cameron Hall</option>
                                    <option>College of Health & Human Services</option>
                                    <option>Colvard</option>
                                    <option>Bonnie E. Cone Center</option>
                                    <option>Cypress Hall</option>
                                    <option>Denny</option>
                                    <option>Duke Centennial Hall</option>
                                    <option>Energy Production & Infrastructure Center</option>
                                    <option>Fretwell</option>
                                    <option>Friday</option>
                                    <option>Garinger</option>
                                    <option>Grigg Hall</option>
                                    <option>Belk Gymnasium</option>
                                    <option>Hawthorn</option>
                                    <option>Student Health Center</option>
                                    <option>Johnson Band Center Building</option>
                                    <option>Klien Hall</option>
                                    <option>The building that shall not be named</option>
                                    <option>Macy</option>
                                    <option>McEniry</option>
                                    <option>McMillan Greenhouse</option>
                                    <option>Mebane Hall</option>
                                    <option>Memorial Hall</option>
                                    <option>Partnership Outreach Research to Accelerate Learning</option>
                                    <option>University Recreation Center</option>
                                    <option>Robinson Hall</option>
                                    <option>Judy W. Rose Football Center</option>
                                    <option>Rowe</option>
                                    <option>Smith</option>
                                    <option>Storrs</option>
                                    <option>Student Union</option>
                                    <option>University Recreation Center</option>
                                    <option>Winningham</option>
                                    <option>Witherspoon</option>
                                    <option>Woodward Hall</option>
                                </select>
                            </div>
                        </div>

                        <div class="location-type">
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