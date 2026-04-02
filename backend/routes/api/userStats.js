const express = require('express');
const router = express.Router({ mergeParams: true });
const userStats = require('../../services/userStats');
const { validateParams } = require('../../middleware/validate');
const { nicknameParamSchema } = require('../../schema');

router.get('/', validateParams(nicknameParamSchema), async function(req, res, next) {
    try {
        const result = await userStats.getStats(req.params.nickname);
        if (result.data.length === 0) {
            return res.status(404).json({
                error: [
                    { message: 'User not found' }
                ],
            });
        }
        res.json(result);
    } catch (err) {
        console.error('Error while getting user stats', err.message);
        next(err);
    }
});

module.exports = router;
