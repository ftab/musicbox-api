const express = require('express');
const router = express.Router();
const activity = require('../services/activity');

const WEB_PER_PAGE = 50;

router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const result = await activity.getRecent(page, WEB_PER_PAGE);
    return res.render('activity', { activity: result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
