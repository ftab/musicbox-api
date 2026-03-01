const express = require('express');
const router = express.Router();
const activity = require('../services/activity');

router.get('/', async function(req, res, next) {
  try {
    const result = await activity.getRecent(req.query.page);
    return res.render('activity', { activity: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
