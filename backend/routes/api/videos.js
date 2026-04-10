const express = require('express');
const router = express.Router();
const videos = require('../../services/videos');
const users = require('../../services/users');
const { validateQuery } = require('../../middleware/validate');
const { paginationQuerySchema, useridQuerySchema, videosSortQuerySchema } = require('../../schema');

/* GET videos */
router.get('/', validateQuery(useridQuerySchema.merge(paginationQuerySchema).merge(videosSortQuerySchema)), async function(req, res, next) {
  try {
    const userid = req.query.userid;
    const user = await users.getOne(userid);

    if(user.data.length === 0) {
        return res.status(404).json({
            error: [
                { message: 'User not found' }
            ],
        });
    }

    res.json(await videos.getMultiple(userid, req.query.page, req.query.limit, req.query.sortBy));
  } catch (err) {
    console.error(`Error while getting videos `, err.message);
    next(err);
  }
});

module.exports = router;
