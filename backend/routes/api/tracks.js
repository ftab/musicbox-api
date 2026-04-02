const express = require('express');
const router = express.Router();
const tracks = require('../../services/tracks');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

router.get('/top', validateQuery(paginationQuerySchema), async function(req, res, next) {
  try {
    res.json(await tracks.getTop(req.query.page, req.query.limit));
  } catch (err) {
    console.error('Error while getting top tracks', err.message);
    next(err);
  }
});

module.exports = router;
