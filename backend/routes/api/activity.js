import express from 'express';
import activity from '../../services/activity.js';
import { validateQuery } from '../../middleware/validate.js';
import { paginationQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await activity.getRecent(req.validatedQuery.page, req.validatedQuery.limit));
});

export default router;
