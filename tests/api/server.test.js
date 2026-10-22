import request from 'supertest';
import assert from 'assert';
import app from '../../backend/server.js';

describe('GET /404', () => {
    it('responds with a 404', async function() {
        const res = await request(app)
            .get('/404')
            .set('Accept', 'application/json');

        assert.equal(res.status, 404);
    });
});
