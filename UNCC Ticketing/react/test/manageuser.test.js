import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ManageUsers from '../components/ManageUsers';

jest.mock('axios');

describe('ManageUsers Component', () => {
  const mockUsers = [
    {
      _id: '1',
      email: 'student@uncc.edu',
      role: 1
    },
    {
      _id: '2',
      email: 'admin@uncc.edu',
      role: 2
    },
    {
      _id: '3',
      email: 'maintenance@uncc.edu',
      role: 3
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    axios.get.mockResolvedValueOnce({ data: mockUsers });
  });

  test('changes user role successfully', async () => {
    // mock successful role update
    axios.put.mockResolvedValueOnce({ data: { ...mockUsers[0], role: 2 } });

    render(
      <BrowserRouter>
        <ManageUsers />
      </BrowserRouter>
    );

    // wait for API call to complete
    await waitFor(() => {
      expect(screen.getByText('student@uncc.edu')).toBeInTheDocument();
    });

    // find the role select for the first user and change it to Admin
    const roleSelects = screen.getAllByRole('combobox');
    fireEvent.change(roleSelects[0], { target: { value: '2' } });

    // check if the API was called with correct params
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3001/users/1',
        { role: 2 }
      );
    });

    // check for success message
    await waitFor(() => {
      expect(screen.getByText(/User role updated successfully/)).toBeInTheDocument();
    });
  });

  test('handles error when changing role fails', async () => {
    // mock API error
    axios.put.mockRejectedValueOnce(new Error('Update failed'));
    axios.get.mockResolvedValueOnce({ data: mockUsers }); // Mock refresh after error

    render(
      <BrowserRouter>
        <ManageUsers />
      </BrowserRouter>
    );

    // wait for initial API call to complete
    await waitFor(() => {
      expect(screen.getByText('student@uncc.edu')).toBeInTheDocument();
    });

    // find the role select for the first user and change it
    const roleSelects = screen.getAllByRole('combobox');
    fireEvent.change(roleSelects[0], { target: { value: '2' } });

    // check for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to update user role. Please try again.')).toBeInTheDocument();
    });

    // check if the refresh API call was made
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  test('refresh button reloads user list', async () => {
    render(
      <BrowserRouter>
        <ManageUsers />
      </BrowserRouter>
    );

    // wait for initial API call to complete
    await waitFor(() => {
      expect(screen.getByText('student@uncc.edu')).toBeInTheDocument();
    });

    // mock second API call for refresh
    axios.get.mockResolvedValueOnce({ data: [...mockUsers, {
      _id: '4',
      email: 'newuser@uncc.edu',
      role: 1
    }] });

    // click refresh button
    fireEvent.click(screen.getByText('Refresh User List'));

    // check if the API was called again
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});
