const express = require('express');
const router = express.Router();
const videos = require('../../services/videos');

/* GET videos */
router.get('/', async function(req, res, next) {
  try {
    res.json(await videos.getMultiple(req.query.userid, req.query.page));
  } catch (err) {
    console.error(`Error while getting videos `, err.message);
    next(err);
  }
});

module.exports = router;
