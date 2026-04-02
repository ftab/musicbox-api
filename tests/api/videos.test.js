const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/videos', () => {
    it('responds with 200 and JSON including playCount field', async () => {
        const res = await request(app).get('/api/videos?userid=1');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok(Array.isArray(res.body.data));
        if (res.body.data.length > 0) {
            assert.ok('playCount' in res.body.data[0]);
            assert.ok('lastPlayedTimestamp' in res.body.data[0]);
        }
    });

    it('responds with 404 for an unknown user ID', async () => {
        const res = await request(app).get('/api/videos?userid=9999999');
        assert.equal(res.status, 404);
        assert.equal(res.body.error[0].message, 'User not found');
    });
});
