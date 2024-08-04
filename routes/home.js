const express = require('express');
const router = express.Router();
const leaderboard = require('../services/leaderboard');

router.get("/", async (req, res) => {
  const users = await leaderboard.getTop50();

  return res.render('home', { users });
});

module.exports = router;
