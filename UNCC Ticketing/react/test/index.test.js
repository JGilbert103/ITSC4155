import React from 'react';
import { render } from '@testing-library/react';
import { TextEncoder } from 'util';
import App from '../src/App';
import Ticket from '../components/Ticket.jsx';
import { connect } from '../mongodb/conn.js';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

describe ('App', () => {
    describe ('App component', () => {
        test ('renders the app component', () => {
            const { getByText } = render(<App />);
            expect(getByText('Niner Mainetenance')).toBeInTheDocument();
        });
    });
});


describe('Database Connection', () => {
    beforeAll(async () => {
      await connect();
    });
  
    test('connects to database', async () => {
      const result = await connect(); 
      expect(result).toBeDefined();
      expect(result.collection('tickets')).toBeDefined();
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  });

describe ('Ticket', () => {
    test ('renders the ticket component', () => {
        const ticket = { firstname: 'John', lastname: 'Doe', problem: 'I need help with my computer', building: 'Building 1', location: 'Room 101', updates: 'No updates yet', poto: 'https://example.com/photo.jpg' };
        const { getByText } = render(<Ticket ticket={ticket} />);
        expect(getByText('Ticket')).toBeInTheDocument();
    });
});