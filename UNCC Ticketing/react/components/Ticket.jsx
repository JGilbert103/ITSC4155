import React from 'react';


function Ticket(){
    return(
        <form>
            <label> Enter First Name: 
                <input type="text"/>
            </label>

            <label> Enter Last Name: 
                <input type="text"/>
            </label>

            <label> Enter Building Name: 
              </label>

            <select>
                <option>Woodward</option>
            </select>

            <label>Location:</label>

        <li>

            <label> Classroom:
                <input type="checkbox" value="name"/>
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

            <label>Other:
                <input type="text"></input>
            </label>
            </li>

            <label>Please Describe Issue and Location
                <input type="text"></input>
            </label>

            <label>Import Photo of issue and Location
                <input type="file" name="photo"></input>
            </label>

            <label>Do you want email updates on this ticket to your school email
                <input type="checkbox"></input>
            </label>
            
        </form>
    )
}

export default Ticket