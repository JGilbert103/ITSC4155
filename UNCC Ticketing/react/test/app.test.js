import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App.jsx'; // Adjust the import path if necessary
import { BrowserRouter as Router } from 'react-router-dom';

// Mock localStorage to control authentication state during tests
beforeAll(() => {
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('App Component', () => {

  // Test that the app shows FAQ page
  test('renders FAQ page when navigating to /faq', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/faq/i));

    // Check that FAQ component is rendered
    waitFor(() => expect(screen.getByText(/faq/i)).toBeInTheDocument());
  });

  // Test rendering the About page
  test('renders About page when navigating to /about', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/about/i));

    // Check that About component is rendered
    waitFor(() => expect(screen.getByText(/about/i)).toBeInTheDocument());
  });
});
