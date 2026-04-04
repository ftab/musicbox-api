const express = require('express');
const router = express.Router();
const search = require('../../services/search');
const { validateQuery } = require('../../middleware/validate');
const { searchTermQuerySchema } = require('../../schema');

router.get('/videos', validateQuery(searchTermQuerySchema), async (req, res, next) => {
    try {
        return res.json(await search.videos(req.query.searchTerm));
    } catch(err) {
        console.error('Error getting song details', err.message);
        next(err);
    }
});

module.exports = router;
