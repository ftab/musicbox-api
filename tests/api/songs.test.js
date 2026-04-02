const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/song/:videoId', () => {
    it('responds with 200 and data object', async () => {
        const res = await request(app).get('/api/song/1');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok('song' in res.body);
        assert.ok('artists' in res.body);
        assert.ok('sharedBy' in res.body);
        assert.ok('moreTracks' in res.body);
    });

    it('responds with 404 for an unknown video ID', async () => {
        const res = await request(app).get('/api/song/9999999');
        assert.equal(res.status, 404);
        assert.equal(res.body.error[0].message, 'Song not found');
    });
});
