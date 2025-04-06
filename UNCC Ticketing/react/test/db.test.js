/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import { connect } from '../mongodb/conn.js';

describe('Database Connection', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://danielleff03:9tZXrhKqsi3Mn2S8@cluster0.zekhtoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
    });

    test('connects to MongoDB', () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 = connected
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
