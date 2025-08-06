import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { connectTestDB, disconnectTestDB, clearTestDB } from './setupTestDB';
import { generateAccessToken, isRefreshTokenValid, saveRefreshToken } from '../src/app';

beforeAll(async () => {
    await connectTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});

beforeEach(async () => {
    await clearTestDB();
});

describe('Test function for authorization', () => {

    it('generate token', () => {
        const token = generateAccessToken("1");
        expect(token).not.toBe(null);
    });

    it('/GET saveRefreshToken', async () => {
        const testToken = generateAccessToken("1");
        await saveRefreshToken(testToken);
        expect(await isRefreshTokenValid(testToken)).not.toBe(null);
    })
});

