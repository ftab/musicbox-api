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

describe('GET /api/videos', () => {
  it('responds with 200 and JSON including playCount field', async function() {
    const res = await request(app).get('/api/videos?userid=1');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.ok(Array.isArray(res.body.data));
    if (res.body.data.length > 0) {
      assert.ok('playCount' in res.body.data[0]);
      assert.ok('lastPlayedTimestamp' in res.body.data[0]);
    }
  });
});

describe('GET /api/users/:nickname/stats', () => {
  it('returns 404 for an unknown nickname', async function() {
    const res = await request(app).get('/api/users/nobody_real_xyzzy_404/stats');
    assert.equal(res.status, 404);
  });
});

describe('GET /api/tracks/top', () => {
  it('responds with 200 and a data array', async function() {
    const res = await request(app).get('/api/tracks/top');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.ok(Array.isArray(res.body.data));
  });
});

describe('GET /top-tracks', () => {
  it('renders the top tracks page', async function() {
    const res = await request(app).get('/top-tracks');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'text/html');
    assert.ok(res.text.includes('MusicBox Top Tracks'));
  });
});

describe('GET /api/activity', () => {
  it('responds with 200 and a data array', async function() {
    const res = await request(app).get('/api/activity');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.ok(Array.isArray(res.body.data));
  });
});

describe('GET /activity', () => {
  it('renders the activity page', async function() {
    const res = await request(app).get('/activity');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'text/html');
    assert.ok(res.text.includes('MusicBox Activity'));
  });
});

describe('GET /api/admin/videos/broken', () => {
  it('responds with 200 and a data array', async function() {
    const res = await request(app).get('/api/admin/videos/broken');
    assert.equal(res.status, 200);
    assert.equal(res.type, 'application/json');
    assert.ok(Array.isArray(res.body.data));
  });
});
