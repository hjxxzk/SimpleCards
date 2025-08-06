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

describe('Test CRUD for Card', () => {

    it('/POST card - incorrect', async () => {
        const response = await request(app)
            .post('/api/cards')
            .send({
                word: "cat",
                translation: "kot",
            });

        expect(response.status).toBe(500);
    });

    async function postCards() {
        const response = await request(app)
            .post('/api/cards')
            .send({
                word: "cat",
                translation: "kot",
                deck_id: "1",
            });

        expect(response.status).toBe(201);
        expect(response.body.id).not.toBeNull();

        const secondResponse = await request(app)
            .post('/api/cards')
            .send({
                word: "dog",
                translation: "pies",
                deck_id: "1",
            });

        expect(secondResponse.status).toBe(201);
        expect(secondResponse.body.id).not.toBeNull();
    }

    it('/GET card', async () => {
        await postCards();
        const response = await request(app)
            .get('/api/cards?search=1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].word).toBe("cat");
        expect(response.body[1].word).toBe("dog");
    })

    it('/DELETE card - correct', async () => {
        await postCards();
        const postResponse = await request(app)
            .post('/api/cards')
            .send({
                word: "cow",
                translation: "krowa",
                deck_id: "1",
            });

        const response = await request(app)
            .delete(`/api/cards/${postResponse.body.id}`);

        expect(response.status).toBe(200);

        const getResponse = await request(app)
            .get('/api/cards?search=1');

        expect(getResponse.body).toHaveLength(2);
    })

    it('/DELETE card - incorrect', async () => {
        await postCards();
        await request(app)
            .post('/api/cards')
            .send({
                word: "cow",
                translation: "krowa",
                deck_id: "1",
            });
        const response = await request(app)
            .delete(`/api/cards/6666`);

        expect(response.status).toBe(500);
    })

    it('/PATCH card with id - correct', async () => {
        await postCards();
        const postResponse = await request(app)
            .post('/api/cards')
            .send({
                word: "cow",
                translation: "krowa",
                deck_id: "1",
            });
        const response = await request(app)
            .patch(`/api/cards/${postResponse.body.id}`)
            .send({
                updatedCard: {
                    word: "donkey",
                    translation: "osiołek",
                    deck_id: "1",
                }
            });
        expect(response.status).toBe(200);

        const getResponse = await request(app)
            .get('/api/cards?search=1');

        expect(getResponse.body[2].word).toBe("donkey");
        expect(getResponse.body[2].translation).toBe("osiołek");
    })

    it('/PATCH card with id - incorrect', async () => {
        await postCards();
        await request(app)
            .post('/api/cards')
            .send({
                word: "cow",
                translation: "krowa",
                deck_id: "1",
            });
        const response = await request(app)
            .patch(`/api/cards/6666`)
            .send({
                updatedCard: {
                    word: "donkey",
                }
            });
        expect(response.status).toBe(500);
    })

});