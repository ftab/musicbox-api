const express = require('express');
const router = express.Router();
const activity = require('../../services/activity');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

router.get('/', validateQuery(paginationQuerySchema), async (req, res, next) => {
    res.json(await activity.getRecent(req.validatedQuery.page, req.validatedQuery.limit));
});

module.exports = router;
