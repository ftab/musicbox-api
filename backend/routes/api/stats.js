const express = require('express');
const router = express.Router({ mergeParams: true });
const stats = require('../../services/stats');

router.get('/', async function(req, res, next) {
  try {
    res.json(await stats.getTotalSongs());
  } catch (err) {
    console.error('Error while getting stats', err.message);
    next(err);
  }
});

module.exports = router;
