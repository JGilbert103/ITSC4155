import React, { useEffect, useState } from 'react';
import '../css/manageusers.css';
import axios from 'axios';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to fetch all users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/getUsers');
            
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                setError('Invalid data format received from server');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle role change for a user
    const handleRoleChange = async (e, userId) => {
        try {
            const newRole = parseInt(e.target.value);
            
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user._id === userId ? { ...user, role: newRole } : user
                )
            );
            
            setLoading(true);
            setError('');
            setSuccessMessage('');
            
            console.log(`Updating user ${userId} to role ${newRole}`);

            const response = await axios.put(`http://localhost:3001/users/${userId}`, { 
                role: newRole 
            });
            
            setSuccessMessage(`User role updated successfully to ${getRoleName(newRole)}`);
            
            fetchUsers();
        } catch (err) {
            console.error('Error updating role:', err);
            setError('Failed to update user role. Please try again.');
            
            fetchUsers();
        } finally {
            setLoading(false);
        }
    };
    
    const getRoleName = (roleNumber) => {
        switch (parseInt(roleNumber)) {
            case 1: return 'User';
            case 2: return 'Admin';
            case 3: return 'Maintenance';
            default: return `Unknown`;
        }
    };

    return (
        <div className='usersContainer'>
            <div className='UsersbackButton'>
                <button><a href='adminportal'>Back</a></button>
            </div>
            <div className='ManageUserText'>
                <h2>Manage Users</h2>
            </div>
            
            <div className='status-container'>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {loading && <div className="loading-indicator">Loading...</div>}
                
                <button 
                    onClick={fetchUsers} 
                    disabled={loading}
                    className="refresh-button"
                >
                    {loading ? 'Loading...' : 'Refresh User List'}
                </button>
            </div>
            
            {users.length === 0 && !loading ? (
                <p>No users found in the database.</p>
            ) : (
                <table className='userTableObjects'>
                    <thead>
                        <tr className='ticketHeader'>
                            <th>User's Email</th>
                            <th>User's Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='allUsers'>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{getRoleName(user.role)}</td>
                                <td>
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => handleRoleChange(e, user._id)}
                                        disabled={loading}
                                        className="role-select"
                                    >
                                        <option value={1}>User</option>
                                        <option value={2}>Admin</option>
                                        <option value={3}>Maintenance</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageUsers;