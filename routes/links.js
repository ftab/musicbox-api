const express = require('express');
const router = express.Router();
const users = require('../services/users');
const videos = require('../services/videos');
const userStats = require('../services/userStats');

const WEB_PER_PAGE = 50;

/* GET videos */
router.get('/', async function(req, res, next) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const user = await users.getByNickname(req.query.nickname);
        if (user.data.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const [vids, stats] = await Promise.all([
            videos.getMultiple(user.data[0].userId, page, WEB_PER_PAGE),
            userStats.getStats(req.query.nickname)
        ]);
        return res.render('links', { vids, user, stats });
    } catch (err) {
        console.error(`Error while getting videos `, err.message);
        next(err);
    }
});

module.exports = router;
