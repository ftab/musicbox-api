const express = require('express');
const router = express.Router();
const users = require('../services/users');
const userStats = require('../services/userStats');
const userProfile = require('../services/userProfile');
const videos = require('../services/videos');

const WEB_PER_PAGE = 50;

router.get('/:nickname', async function(req, res, next) {
    try {
        const nickname = req.params.nickname;
        const page = parseInt(req.query.page, 10) || 1;

        const user = await users.getByNickname(nickname);
        if (user.data.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const [stats, topArtists, topTags, recentActivity, vids] = await Promise.all([
            userStats.getStats(nickname),
            userProfile.getTopArtists(nickname, 15),
            userProfile.getTopTags(nickname, 15),
            userProfile.getRecentActivity(nickname, 10),
            videos.getMultiple(user.data[0].userId, page, WEB_PER_PAGE)
        ]);

        return res.render('user', {
            user: user.data[0],
            stats: stats.data[0] || null,
            topArtists,
            topTags,
            recentActivity,
            vids
        });
    } catch (err) {
        console.error('Error getting user profile', err.message);
        next(err);
    }
});

module.exports = router;
