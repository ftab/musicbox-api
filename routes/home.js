const express = require('express');
const router = express.Router();
const leaderboard = require('../services/leaderboard');
const stats = require('../services/stats');

router.get("/", async (req, res) => {
  const users = await leaderboard.getTop50();
  const totalSongs = await stats.getTotalSongs();

  return res.render('home', { users, totalSongs });
});

module.exports = router;
