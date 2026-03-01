const express = require('express');
const router = express.Router();
const users = require('../services/users');
const videos = require('../services/videos');

/* GET videos */
router.get('/', async function(req, res, next) {
    try {
        const user = await users.getByNickname(req.query.nickname);
        if (user.data.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const vids = await videos.getMultiple(user.data[0].userId, req.query.page);
        return res.render('links', { vids, user });
    } catch (err) {
        console.error(`Error while getting videos `, err.message);
        next(err);
    }
});
  
module.exports = router;
  