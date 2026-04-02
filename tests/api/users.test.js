const request = require('supertest');
const assert = require('assert')
const app = require('../../backend/server');

describe('GET /api/users', () => {
    it('responds with 200 and data array of all users', async () => {
        const res = await request(app).get('/api/users');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok(Array.isArray(res.body.data));
    });
});

describe('GET /api/users/:nickname', () => {
    it('response with 200 and data object of one user', async () => {
        const res = await request(app).get('/api/users/Cuckoo');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok('user' in res.body);
        assert.ok('stats' in res.body);
        assert.ok('topArtists' in res.body);
        assert.ok('topTags' in res.body);
    });

    it('responds with 404 for an unknown nickname', async () => {
        const res = await request(app).get('/api/users/nobody_real_xyzzy_404');
        assert.equal(res.status, 404);
        assert.equal(res.body.error[0].message, 'User not found');
    });
});

describe('GET /api/users/:nickname/stats', () => {
    it('responds with 200 and data array', async () => {
        const res = await request(app).get('/api/users/Cuckoo/stats');
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.ok(Array.isArray(res.body.data));
    });
});
