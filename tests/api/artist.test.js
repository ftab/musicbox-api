const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/artist/:artistId', () => {
    it('responds with 200 and a data object', async () => {
        const res = await request(app).get('/api/artist/1');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok('artist' in res.body);
        assert.ok('tracks' in res.body);
        assert.ok('topSharers' in res.body);
    });

    it('responds with 404 for an unknown artist ID', async () => {
        const res = await request(app).get('/api/artist/9999999');
        assert.equal(res.status, 404);
        assert.equal(res.body.error[0].message, 'Artist not found');
    });
});
