const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/leaderboard', () => {
    it('responds with 200 and a data array', async () => {
        const res = await request(app).get('/api/leaderboard');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok(Array.isArray(res.body.data));
    });
});
