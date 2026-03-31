const express = require('express');
const router = express.Router();
const users = require('../../services/users');
const userStats = require('../../services/userStats');
const userProfile = require('../../services/userProfile');
const videos = require('../../services/videos');

/* GET users */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.get('/:nickname', async function(req, res, next) {
    try {
        const nickname = req.params.nickname;
        const user = await users.getByNickname(nickname);

        if (user.data.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
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
    } catch(err) {
        console.error('Error getting user profile', err.message);
        next(err);
    }
});

module.exports = router;
