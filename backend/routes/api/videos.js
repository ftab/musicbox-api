import express from 'express';
import videos from '../../services/videos.js';
import users from '../../services/users.js';
import { validateQuery } from '../../middleware/validate.js';
import { paginationQuerySchema, useridQuerySchema, videosSortQuerySchema } from '../../schema.js';

const router = express.Router();

router.get(
    '/',
    validateQuery(
        useridQuerySchema
            .merge(paginationQuerySchema)
            .merge(videosSortQuerySchema)
    ),
    async (req, res) => {
        const userid = req.validatedQuery.userid;
        const user = await users.getOne(userid);

        if(user.data.length === 0) {
            return res.status(404).json({
                error: [
                    { message: 'User not found' }
                ],
            });
        }

        res.json(await videos.getMultiple(userid, req.validatedQuery.page, req.validatedQuery.limit, req.validatedQuery.sortBy));
    }
);

export default router;
