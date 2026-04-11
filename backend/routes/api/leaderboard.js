const express = require('express');
const router = express.Router();
const leaderboard = require('../../services/leaderboard');
const peepee = require('../../services/peepee');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

/* GET leaderboard */
router.get('/', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await leaderboard.get(req.validatedQuery.page, req.validatedQuery.limit));
});

router.get('/peepee', async (req, res, next) => {
    res.json(await peepee.getRankings());
});

module.exports = router;
