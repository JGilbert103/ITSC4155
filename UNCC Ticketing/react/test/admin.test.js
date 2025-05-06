import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AdminPortal from '../components/AdminPortal';
import { useAuth } from '../src/AuthContext';

jest.mock('axios');

jest.mock('../src/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('AdminPortal Component', () => {
  const mockTickets = [
    {
      _id: { $oid: '1' },
      ticketid: 1001,
      firstname: 'John',
      lastname: 'Doe',
      building: 'Atkins',
      location: 'Classroom 101',
      problem: 'Computer not working',
      status: 1,
      createdAt: '2023-04-15T10:30:00Z'
    },
    {
      _id: { $oid: '2' },
      ticketid: 1002,
      firstname: 'Jane',
      lastname: 'Doe',
      building: 'Cone',
      location: 'Hallway',
      problem: 'Light bulb needs replacement',
      status: 2,
      createdAt: '2023-04-16T14:45:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    useAuth.mockReturnValue({
      userRole: 2, 
      isAdmin: true,
      isAuthenticated: true,
      userEmail: 'admin@uncc.edu'
    });

    // mock successful API response
    axios.get.mockResolvedValueOnce({ data: mockTickets });
  });

  test('renders admin portal with tickets', async () => {
    render(
      <BrowserRouter>
        <AdminPortal />
      </BrowserRouter>
    );

    // wait for API call to complete
    await waitFor(() => {
      // check if the table headers are present
      expect(screen.getByText('Ticket ID')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Building')).toBeInTheDocument();
      expect(screen.getByText('Problem')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      
      // check if ticket data is rendered
      expect(screen.getByText('1001')).toBeInTheDocument();
      expect(screen.getByText('Doe, John')).toBeInTheDocument();
      expect(screen.getByText('Atkins')).toBeInTheDocument();
      expect(screen.getByText('Computer not working')).toBeInTheDocument();
      
      // check if the second ticket is rendered
      expect(screen.getByText('1002')).toBeInTheDocument();
      expect(screen.getByText('Doe, Jane')).toBeInTheDocument();
    });

    // check if API was called correctly
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/getTickets');
  });
});
