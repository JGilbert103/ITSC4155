import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';
import { AuthProvider } from '../src/AuthContext';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  beforeEach(() => {
    // clear mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // checks if all form elements are present
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('displays error when using non-UNCC email', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // fills the form in with invalid email
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
        target: { value: 'test@gmail.com' }
      });
    const passwordInput = document.getElementById('password');
    fireEvent.change(passwordInput, {
    target: { value: 'password123' }
    });

    // submits the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // checks if error message appears
    expect(screen.getByText('Only those with a UNCC email are authorized to access this application.')).toBeInTheDocument();
  });

    test('calls API and navigates on successful login for regular user', async () => {
    // mocks successful API response for regular user
    axios.post.mockResolvedValueOnce({
      data: { role: 1, email: 'student@uncc.edu' }
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // fills the form in with valid data
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@uncc.edu' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });

    // submits the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // waits for the API call to complete
    await waitFor(() => {
      // checks if axios.post was called with the right parameters
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', {
        email: 'student@uncc.edu',
        password: 'password123'
      });
      
      // checks if navigation was triggered to the right route
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  test('calls API and navigates on successful login for admin user', async () => {
    // mocks successful API response for admin user
    axios.post.mockResolvedValueOnce({
      data: { role: 2, email: 'admin@uncc.edu' }
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // fills the form in with valid admin data
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'admin@uncc.edu' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'adminpass' }
    });

    // submits the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // waits for the API call to complete
    await waitFor(() => {
      // checks if navigation was triggered to admin portal
      expect(mockNavigate).toHaveBeenCalledWith('/adminportal');
    });
  });

  test('displays error when login fails', async () => {
    // mocks API error response
    axios.post.mockRejectedValueOnce({
      response: { status: 401 }
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // fills the form in with valid format but incorrect credentials
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'student@uncc.edu' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' }
    });

    // submits the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // waits for the API call to complete and error to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
    });
  });
});
