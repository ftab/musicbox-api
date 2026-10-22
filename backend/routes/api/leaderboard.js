import express from 'express';
import leaderboard from '../../services/leaderboard.js';
import peepee from '../../services/peepee.js';
import { validateQuery } from '../../middleware/validate.js';
import { paginationQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await leaderboard.get(req.validatedQuery.page, req.validatedQuery.limit));
});

router.get('/peepee', validateQuery(paginationQuerySchema), async (req, res, next) => {
    res.json(await peepee.getRankings(req.validatedQuery.page, req.validatedQuery.limit));
});

export default router;
