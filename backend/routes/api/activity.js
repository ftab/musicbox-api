const express = require('express');
const router = express.Router();
const activity = require('../../services/activity');

router.get('/', async function(req, res, next) {
  try {
    res.json(await activity.getRecent(req.query.page, req.query.limit));
  } catch (err) {
    console.error('Error while getting activity', err.message);
    next(err);
  }
});

module.exports = router;
