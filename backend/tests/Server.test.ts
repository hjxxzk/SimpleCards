import { describe, it, expect, vi, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import app from '../src/app';

vi.mock('mongoose', () => ({
    default: {
        connect: vi.fn().mockResolvedValue(undefined),
    },
}));

vi.mock('./app', () => ({
    default: {
        listen: vi.fn((port: number, callback: () => void) => callback()),
    },
}));

import { startServer } from '../src/server';

describe('startServer', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        vi.clearAllMocks();
        process.env = { ...OLD_ENV, PORT: '3000', MONGO_URI: 'mongodb://localhost:27017/db' };
    });

    it('should connect to MongoDB and start the server', async () => {
        const connectSpy = vi.spyOn(mongoose, 'connect');
        const listenSpy = vi.spyOn(app, 'listen');

        await startServer();

        expect(connectSpy).toHaveBeenCalledWith('mongodb://localhost:27017/db');
        expect(listenSpy).toHaveBeenCalledWith("3000", expect.any(Function));
    });

    it('should log error if MongoDB connection fails', async () => {
        vi.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error('Connection failed'));
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        await startServer();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Failed to connect to MongoDB',
            expect.any(Error)
        );
    });
});