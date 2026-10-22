import express from 'express';
import videos from '../../../services/videos.js';
import { validateQuery } from '../../../middleware/validate.js';
import { paginationQuerySchema } from '../../../schema.js';

const router = express.Router();

router.get('/broken', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await videos.getBroken(req.validatedQuery.page, req.validatedQuery.limit));
});

export default router;
