import express from 'express';
import userStats from '../../services/userStats.js';
import { validateParams } from '../../middleware/validate.js';
import { nicknameParamSchema } from '../../schema.js';

const router = express.Router({ mergeParams: true });

router.get('/', validateParams(nicknameParamSchema), async (req, res) => {
    const result = await userStats.getStats(req.validatedParams.nickname);

    if(result.data.length === 0) {
        return res.status(404).json({
            error: [
                { message: 'User not found' }
            ],
        });
    }

    res.json(result);
});

export default router;
