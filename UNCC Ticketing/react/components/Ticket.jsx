import React from 'react';
import '../css/ticket.css'

function Ticket() {
    return (
        <>
            <div className="border">
                <div className="form-border" >
                    <form>

                        <div className="first-last">
                            <label>First Name:
                                <input type="text" required />
                            </label>
                            <label>Last Name:
                                <input type="text" required />
                            </label>
                        </div>

                        <div className="building-location">
                            <div className="building-dropdown">
                                <label>Enter Building Name:</label>
                                <select>
                                    <option>Woodward</option>
                                </select>
                            </div>

                            <div className="location-select">
                                <label className="location-label">Location:</label>
                                <label> Classroom:
                                    <input type="checkbox" value="name" />
                                </label>

                                <label>Bathroom:
                                    <input type="checkbox" value="name"></input>
                                </label>

                                <label>Main Building:
                                    <input type="checkbox" value="name"></input>
                                </label>

                                <label>Dorm:
                                    <input type="checkbox" value="name"></input>
                                </label>

                                <label>Study Area:
                                    <input type="checkbox" value="name"></input>
                                </label>

                                <label>Other:
                                    <input type="text"></input>
                                </label>
                            </div>
                        </div>

                        <div className="add-photo">
                            <label>Import photo of issue and location
                                <input type="file" name="photo"></input>
                            </label>
                        </div>

                        <div className="description">
                        <label>Please Describe Issue and Location
                            <input type="text"></input>
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