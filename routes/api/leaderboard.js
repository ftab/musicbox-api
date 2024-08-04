const express = require('express');
const router = express.Router();
const leaderboard = require('../../services/leaderboard');

/* GET leaderboard */
router.get('/', async function(req, res, next) {
  try {
    res.json(await leaderboard.get(req.query.page));
  } catch (err) {
    console.error(`Error while getting leaderboard `, err.message);
    next(err);
  }
});

module.exports = router;
