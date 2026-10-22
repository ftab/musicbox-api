import express from 'express';
import search from '../../services/search.js';
import { validateQuery } from '../../middleware/validate.js';
import { searchTermQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/videos', validateQuery(searchTermQuerySchema), async (req, res) => {
    return res.json(await search.videos(req.validatedQuery.searchTerm));
});

export default router;
