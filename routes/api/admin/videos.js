const express = require('express');
const router = express.Router();
const videos = require('../../../services/videos');

router.get('/broken', async function(req, res, next) {
  try {
    res.json(await videos.getBroken(req.query.page));
  } catch (err) {
    console.error('Error while getting broken videos', err.message);
    next(err);
  }
});

module.exports = router;
