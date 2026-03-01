const request = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('GET /help', () => {
  it('renders the help page', async function() {
    const res = await request(app).get('/help');

    assert.equal(res.status, 200);
    assert.equal(res.type, 'text/html');
    assert.ok(res.text.includes('MusicBox Help'));
  });
});

describe('GET /404', () => {
  it('responds with a 404', async function() {
    const res = await request(app)
      .get('/404')
      .set('Accept', 'application/json');

    assert.equal(res.status, 404);
  });
});
