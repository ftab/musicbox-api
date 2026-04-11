const express = require('express');
const router = express.Router();
const search = require('../../services/search');
const { validateQuery } = require('../../middleware/validate');
const { searchTermQuerySchema } = require('../../schema');

router.get('/videos', validateQuery(searchTermQuerySchema), async (req, res) => {
    return res.json(await search.videos(req.validatedQuery.searchTerm));
});

module.exports = router;
