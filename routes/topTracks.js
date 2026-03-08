const express = require('express');
const router = express.Router();
const tracks = require('../services/tracks');

const WEB_PER_PAGE = 50;

router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const result = await tracks.getTop(page, WEB_PER_PAGE);
    return res.render('topTracks', { tracks: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
