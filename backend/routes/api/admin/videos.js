const express = require('express');
const router = express.Router();
const videos = require('../../../services/videos');
const { validateQuery } = require('../../../middleware/validate');
const { paginationQuerySchema } = require('../../../schema');

router.get('/broken', validateQuery(paginationQuerySchema), async function(req, res, next) {
  try {
    res.json(await videos.getBroken(req.query.page, req.query.limit));
  } catch (err) {
    console.error('Error while getting broken videos', err.message);
    next(err);
  }
});

module.exports = router;
