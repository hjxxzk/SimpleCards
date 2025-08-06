import { vi, describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { connectTestDB, disconnectTestDB, clearTestDB } from './setupTestDB';
import app from '../src/app';

vi.mock('../src/authenticationService', () => ({
    authenticate: vi.fn((req, res, next) => {
        req.id = 'mocked-user-id';
        next();
    })
}));


beforeAll(async () => {
    await connectTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});

beforeEach(async () => {
    await clearTestDB();
});

describe('Test CRUD for Deck', () => {

    it('/POST deck - incorrect', async () => {
        const response = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck1",
                user_id: 1,
                description: "Deck for testing purposes",
            });

        expect(response.status).toBe(500);
    });

    async function postDecks() {
        const response = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck1",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });

        expect(response.status).toBe(201);
        expect(response.body.id).not.toBeNull();

        const secondResponse = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck2",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });

        expect(secondResponse.status).toBe(201);
        expect(secondResponse.body.id).not.toBeNull();
    }

    it('/GET deck', async () => {
        await postDecks();
        const response = await request(app)
            .get('/api/decks');
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe("Test Deck1");
        expect(response.body[1].name).toBe("Test Deck2");
    })

    it('/DELETE deck - correct', async () => {
        await postDecks();
        const postResponse = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });
        const response = await request(app)
            .delete(`/api/decks/${postResponse.body.id}`);

        expect(response.status).toBe(200);

        const getResponse = await request(app)
            .get('/api/decks');

        expect(getResponse.body).toHaveLength(2);
    })

    it('/DELETE deck - incorrect', async () => {
        await postDecks();
        await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });
        const response = await request(app)
            .delete(`/api/decks/6666`);

        expect(response.status).toBe(500);
    })

    it('/GET deck with id - correct', async () => {
        await postDecks();
        const postResponse = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });
        const response = await request(app)
            .get(`/api/decks/${postResponse.body.id}`);
        expect(response.body.name).toBe("Test Deck3");
    })

    it('/GET deck with id - incorrect', async () => {
        await postDecks();
        await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });
        const response = await request(app)
            .get('/api/decks/6666');
        expect(response.status).toBe(500);
    })

    it('/PATCH deck with id - correct', async () => {
        await postDecks();
        const postResponse = await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });

        const response = await request(app)
            .patch(`/api/decks/${postResponse.body.id}`)
            .send({
                updatedDeck: {
                    name: "Testing Deck",
                    user_id: 1,
                    description: "Deck not for learning purposes",
                    sourceLanguage: "en",
                    translationLanguage: "pl",
                }
            });
        expect(response.status).toBe(200);

        const getResponse = await request(app)
            .get(`/api/decks/${postResponse.body.id}`);
        expect(getResponse.body.name).toBe("Testing Deck");
        expect(getResponse.body.description).toBe("Deck not for learning purposes");
    })

    it('/PATCH deck with id - incorrect', async () => {
        await postDecks();
        await request(app)
            .post('/api/decks')
            .send({
                name: "Test Deck3",
                user_id: 1,
                description: "Deck for testing purposes",
                sourceLanguage: "en",
                translationLanguage: "pl",
            });

        const response = await request(app)
            .patch(`/api/decks/7777`)
            .send({
                updatedDeck: {
                    name: "Testing Deck",
                }
            });
        expect(response.status).toBe(500);
    })
});