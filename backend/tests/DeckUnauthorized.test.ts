import { vi, describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { connectTestDB, disconnectTestDB, clearTestDB } from './setupTestDB';
import app from '../src/app';

beforeAll(async () => {
    await connectTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});

beforeEach(async () => {
    await clearTestDB();
});

describe('Test Unauthorized CRUD for Deck', () => {

    it('/POST deck', async () => {
        const response = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck1",
                user_id: 1,
                description: "Deck for testing purposes",
            });

        expect(response.status).toBe(401);
    });

    it('/GET deck', async () => {
        const response = await request(app)
            .get('/api/decks');
        expect(response.status).toBe(401);
    })

    it('/DELETE deck', async () => {
        const response = await request(app)
            .delete(`/api/decks/1`);

        expect(response.status).toBe(401);
    })

    it('/GET deck with id', async () => {
        const response = await request(app)
            .get(`/api/decks/1`);
        expect(response.status).toBe(401);
    })

    it('/PATCH deck with id', async () => {
        const response = await request(app)
            .patch(`/api/decks/1`)
            .send({
                updatedDeck: {
                    name: "Testing Deck",
                    user_id: 1,
                    description: "Deck not for learning purposes",
                    sourceLanguage: "en",
                    translationLanguage: "pl",
                }
            });
        expect(response.status).toBe(401);
    })
});