const express = require('express');
const router = express.Router({ mergeParams: true });
const userStats = require('../../services/userStats');

router.get('/', async function(req, res, next) {
  try {
    const result = await userStats.getStats(req.params.nickname);
    if (result.data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result);
  } catch (err) {
    console.error('Error while getting user stats', err.message);
    next(err);
  }
});

module.exports = router;
