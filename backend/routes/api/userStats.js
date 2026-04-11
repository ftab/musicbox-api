const express = require('express');
const router = express.Router({ mergeParams: true });
const userStats = require('../../services/userStats');
const { validateParams } = require('../../middleware/validate');
const { nicknameParamSchema } = require('../../schema');

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

module.exports = router;
