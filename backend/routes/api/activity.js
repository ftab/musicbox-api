const express = require('express');
const router = express.Router();
const activity = require('../../services/activity');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

router.get('/', validateQuery(paginationQuerySchema), async function(req, res, next) {
  try {
    res.json(await activity.getRecent(req.query.page, req.query.limit));
  } catch (err) {
    console.error('Error while getting activity', err.message);
    next(err);
  }
});

module.exports = router;
