import express from 'express';
import stats from '../../services/stats.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await stats.get());
});

export default router;
