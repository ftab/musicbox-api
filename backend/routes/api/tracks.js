const express = require('express');
const router = express.Router();
const tracks = require('../../services/tracks');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema } = require('../../schema');

router.get('/top', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await tracks.getTop(req.validatedQuery.page, req.validatedQuery.limit));
});

module.exports = router;
