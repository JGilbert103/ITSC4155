import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Ticket from '../components/Ticket';

jest.mock('axios');

global.fetch = jest.fn();

describe('Ticket Component', () => {
  beforeEach(() => {
    // clear mocks before each test
    jest.clearAllMocks();
    
    // mock localStorage
    Storage.prototype.getItem = jest.fn().mockReturnValue('test@uncc.edu');
    
    // mock the fetch responses for buildings and locations
    global.fetch.mockImplementation((url) => {
      if (url === '/buildings.txt') {
        return Promise.resolve({
          text: () => Promise.resolve('Atkins\nCone\nBurson')
        });
      } else if (url === '/locations.txt') {
        return Promise.resolve({
          text: () => Promise.resolve('Classroom:\nDorm:\nHallway:\nRestroom:')
        });
      }
      return Promise.reject(new Error('Unhandled fetch'));
    });

    // mock successful API response
    axios.post.mockResolvedValue({ data: { ticketid: 1 } });
  });

  test('renders ticket form correctly', async () => {
    render(
      <BrowserRouter>
        <Ticket />
      </BrowserRouter>
    );

    // waits for the fetch calls to complete
    await waitFor(() => {
      expect(screen.getByText('First Name:')).toBeInTheDocument();
      expect(screen.getByText('Last Name:')).toBeInTheDocument();
      expect(screen.getByText('Enter Building Name:')).toBeInTheDocument();
      expect(screen.getByText('Location:')).toBeInTheDocument();
    });
  });

  test('renders ticket form correctly', async () => {
    render(
      <BrowserRouter>
        <Ticket />
      </BrowserRouter>
    );

    // waits for the fetch calls to complete
    await waitFor(() => {
      // form labels should be shown after fetch
      expect(screen.getByText('First Name:')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(
      <BrowserRouter>
        <Ticket />
      </BrowserRouter>
    );

    // waits for the fetch calls to complete
    await waitFor(() => {
      expect(screen.getByText('First Name:')).toBeInTheDocument();
    });

    // fills in the form
    fireEvent.change(screen.getByLabelText(/First Name:/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), {
      target: { value: 'Doe' }
    });

    // selects building from dropdown
    const buildingSelect = screen.getByRole('combobox');
    fireEvent.change(buildingSelect, { target: { value: 'Atkins' } });

    // waits for radio buttons to be available
    await waitFor(() => {
      // find the radio input with Classroom text in its label
      const classroomLabels = screen.getAllByText(/Classroom/i);
      expect(classroomLabels.length).toBeGreaterThan(0);
    });

    // click the radio input directly 
    const classroomLabel = screen.getByText("Classroom:");
    const radioInput = classroomLabel.parentElement.querySelector('input[type="radio"][value="Classroom"]');
    if (!radioInput) {
      const allRadios = screen.getAllByRole('radio');
      const classroomRadio = allRadios.find(radio => radio.value === 'Classroom');
      if (classroomRadio) {
        fireEvent.click(classroomRadio);
      }
    } else {
      fireEvent.click(radioInput);
    }

    // room number input appears after selecting Classroom
    await waitFor(() => {
      const roomInput = screen.getByLabelText(/Room Number:/i);
      fireEvent.change(roomInput, { target: { value: '101' } });
    });

    // fill problem description
    const problemTextarea = screen.getByLabelText(/Please Describe Issue and Location:/i);
    fireEvent.change(problemTextarea, {
      target: { value: 'Computer not working in classroom 101' }
    });

    // submit the form
    const submitButton = screen.getByText(/Submit Ticket/i);
    fireEvent.click(submitButton);

    // check if the  axios.post was called with the right parameters
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/tickets',
        expect.objectContaining({
          firstname: 'John',
          lastname: 'Doe',
          building: 'Atkins',
          location: 'Classroom 101',
          problem: 'Computer not working in classroom 101',
          email: 'test@uncc.edu'
        })
      );
    });
  });
});
