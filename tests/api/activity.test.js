import request from 'supertest';
import assert from 'assert';
import app from '../../backend/server.js';

describe('GET /api/activity', () => {
    it('responds with 200 and a data array', async () => {
        const res = await request(app).get('/api/activity');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok(Array.isArray(res.body.data));
    });
});
