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

describe('Test unauthorized CRUD for Card', () => {

    it('/POST card', async () => {
        const response = await request(app)
            .post('/api/cards')
            .send({
                word: "cat",
                translation: "kot",
            });

        expect(response.status).toBe(401);
    });

    it('/GET card', async () => {
        const response = await request(app)
            .get('/api/cards?search=1');
        expect(response.status).toBe(401);
    })

    it('/DELETE card', async () => {
        const response = await request(app)
            .delete(`/api/cards/1`);

        expect(response.status).toBe(401);
    })

    it('/PATCH card with id', async () => {
        const response = await request(app)
            .patch(`/api/cards/1`)
            .send({
                updatedCard: {
                    word: "donkey",
                    translation: "osiołek",
                    deck_id: "1",
                }
            });
        expect(response.status).toBe(401);
    })
});