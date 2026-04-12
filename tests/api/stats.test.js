const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');
const { stats } = require('../mocks/stats');

describe('GET /api/stats', () => {
    it('responds with 200 and data object', async () => {
        const res = await request(app).get('/api/stats');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        Object.keys(stats).forEach(key => {
            assert.ok(key in res.body);
        });
    });
});
