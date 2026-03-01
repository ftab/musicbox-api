const express = require('express');
const router = express.Router();
const tracks = require('../services/tracks');

router.get('/', async function(req, res, next) {
  try {
    const result = await tracks.getTop(req.query.page);
    return res.render('topTracks', { tracks: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
