import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import UserPortal from '../components/UserPortal';

jest.mock('axios');

describe('UserPortal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    Storage.prototype.getItem = jest.fn().mockReturnValue('student@uncc.edu');
  });

  test('renders user portal with tickets', async () => {
    // mock ticket data from API
    const mockTickets = [
      {
        _id: '1',
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
        _id: '2',
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

    // mock successful API response
    axios.get.mockResolvedValueOnce({ data: mockTickets });

    render(
      <BrowserRouter>
        <UserPortal />
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
      expect(screen.getByText('Light bulb needs replacement')).toBeInTheDocument();
    });

    // check if authorization header was set correctly
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/userTickets', {
      headers: { 'Authorization': 'Bearer student@uncc.edu' }
    });
  });

  test('handles empty ticket list', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <UserPortal />
      </BrowserRouter>
    );

    // wait for API call to complete
    await waitFor(() => {
      // the table headers should still be present
      expect(screen.getByText('No tickets found.')).toBeInTheDocument();
      
      // no ticket data should be visible
      expect(screen.queryByText('Doe, John')).not.toBeInTheDocument();
    });
  });
});