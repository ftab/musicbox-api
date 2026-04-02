const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/stats', () => {
    it('responds with 200 and data object', async () => {
        const res = await request(app).get('/api/stats');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok('totalSongs' in res.body);
    });
});
