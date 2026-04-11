const express = require('express');
const router = express.Router();
const users = require('../../services/users');
const userStats = require('../../services/userStats');
const userProfile = require('../../services/userProfile');
const videos = require('../../services/videos');
const { validateQuery, validateParams } = require('../../middleware/validate');
const { paginationQuerySchema, nicknameParamSchema } = require('../../schema');

/* GET users */
router.get('/', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await users.getMultiple(req.validatedQuery.page, req.validatedQuery.limit));
});

router.get('/:nickname', validateParams(nicknameParamSchema), async function(req, res) {
    const nickname = req.validatedParams.nickname;
    const user = await users.getByNickname(nickname);

    if(user.data.length === 0) {
        return res.status(404).json({
            error: [
                { message: 'User not found' }
            ],
        });
    }

    const [stats, topArtists, topTags] = await Promise.all([
        userStats.getStats(nickname),
        userProfile.getTopArtists(nickname, 15),
        userProfile.getTopTags(nickname, 15),
    ]);

    res.json({
        user: user.data[0],
        stats: stats.data[0],
        topArtists,
        topTags,
    });
});

module.exports = router;
