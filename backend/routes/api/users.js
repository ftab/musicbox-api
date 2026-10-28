import express from 'express';
import users from '../../services/users.js';
import userStats from '../../services/userStats.js';
import userProfile from '../../services/userProfile.js';
import videos from '../../services/videos.js';
import heatmap from '../../services/heatmap.js';
import { validateQuery, validateParams } from '../../middleware/validate.js';
import { paginationQuerySchema, nicknameParamSchema, timezoneQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/', validateQuery(paginationQuerySchema), async (req, res) => {
    res.json(await users.getMultiple(req.validatedQuery.page, req.validatedQuery.limit));
});

router.get('/:nickname', validateParams(nicknameParamSchema), validateQuery(timezoneQuerySchema), async function(req, res) {
    const nickname = req.validatedParams.nickname;
    const timezone = req.validatedQuery.tz;
    const user = await users.getByNickname(nickname);

    if(user.data.length === 0) {
        return res.status(404).json({
            error: [
                { message: 'User not found' }
            ],
        });
    }

    const [stats, topArtists, topTags, contribHeatmap] = await Promise.all([
        userStats.getStats(nickname),
        userProfile.getTopArtists(nickname, 15),
        userProfile.getTopTags(nickname, 15),
        heatmap.get(user.data[0].userId, timezone),
    ]);

    res.json({
        user: user.data[0],
        stats: stats.data[0],
        topArtists,
        topTags,
        heatmap: contribHeatmap,
    });
});

export default router;
