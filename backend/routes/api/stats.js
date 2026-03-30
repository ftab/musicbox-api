const express = require('express');
const router = express.Router({ mergeParams: true });
const stats = require('../../services/stats');

router.get('/', async function(req, res, next) {
  try {
    const result = await stats.getTotalSongs();
    res.json(result);
  } catch (err) {
    console.error('Error while getting stats', err.message);
    next(err);
  }
});

module.exports = router;
