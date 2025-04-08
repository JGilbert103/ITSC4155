import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/manageusers.css';

function ManageUsers (){

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return(
        <div className='allUsers'>
            <table className='userTableObjects'>
                <thead>
                    <tr className='ticketHeader'>
                        <th>User's Email</th>
                        <th>User's Name</th>
                        <th>User's Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='allUsers'>
                    <tr>
                        <td>jgilbe42@uncc.edu</td>
                        <td>Gilbert, Jake</td>
                        <select>
                            <option>User</option> 
                            <option>Admin</option> 
                            <option>Maintenance</option> 
                        </select>
                        <td><a href=''><button className='viewButton'>Submit Change</button></a></td>
                    </tr>
                    <tr>
                        <td>jgilbe42@uncc.edu</td>
                        <td>Gilbert, Jake</td>
                        <select>
                            <option>User</option> 
                            <option>Admin</option> 
                            <option>Maintenance</option> 
                        </select>
                        <td><a href=''><button className='viewButton'>Submit Change</button></a></td>
                    </tr>
                    <tr>
                        <td>jgilbe42@uncc.edu</td>
                        <td>Gilbert, Jake</td>
                        <select>
                            <option>User</option> 
                            <option>Admin</option> 
                            <option>Maintenance</option> 
                        </select>
                        <td><a href=''><button className='viewButton'>Submit Change</button></a></td>
                    </tr>
                    <tr>
                        <td>jgilbe42@uncc.edu</td>
                        <td>Gilbert, Jake</td>
                        <select>
                            <option>User</option> 
                            <option>Admin</option> 
                            <option>Maintenance</option> 
                        </select>
                        <td><a href=''><button className='viewButton'>Submit Change</button></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsers;