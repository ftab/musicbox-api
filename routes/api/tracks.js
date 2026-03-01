const express = require('express');
const router = express.Router();
const tracks = require('../../services/tracks');

router.get('/top', async function(req, res, next) {
  try {
    res.json(await tracks.getTop(req.query.page));
  } catch (err) {
    console.error('Error while getting top tracks', err.message);
    next(err);
  }
});

module.exports = router;
