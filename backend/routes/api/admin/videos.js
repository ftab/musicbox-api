const express = require('express');
const router = express.Router();
const videos = require('../../../services/videos');
const { validateQuery } = require('../../../middleware/validate');
const { paginationQuerySchema } = require('../../../schema');

router.get('/broken', validateQuery(paginationQuerySchema), async (req, res, next) => {
    res.json(await videos.getBroken(req.validatedQuery.page, req.validatedQuery.limit));
});

module.exports = router;
