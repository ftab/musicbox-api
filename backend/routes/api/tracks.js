import express from 'express';
import tracks from '../../services/tracks.js';
import { validateQuery } from '../../middleware/validate.js';
import { paginationQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/top', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await tracks.getTop(req.validatedQuery.page, req.validatedQuery.limit));
});

export default router;
