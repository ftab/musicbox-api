const express = require('express');
const router = express.Router();
const leaderboard = require('../../services/leaderboard');
const peepee = require('../../services/peepee');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

/* GET leaderboard */
router.get('/', validateQuery(paginationQuerySchema), async function(req, res, next) {
  try {
    res.json(await leaderboard.get(req.query.page, req.query.limit));
  } catch (err) {
    console.error(`Error while getting leaderboard `, err.message);
    next(err);
  }
});

router.get('/peepee', async function(req, res, next) {
    try {
        res.json(await peepee.getRankings(req.query.page, req.query.limit));
    } catch(err) {
        console.error(`Error while getting peepee leaderboard `, err.message);
        next(err);
    }
});

module.exports = router;
