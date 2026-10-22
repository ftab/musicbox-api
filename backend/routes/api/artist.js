import express from 'express';
import artists from '../../services/artists.js';
import artistDetails from '../../services/artistDetails.js';
import { validateQuery, validateParams } from '../../middleware/validate.js';
import { artistIdParamSchema, paginationQuerySchema, letterFilterQuerySchema } from '../../schema.js';

const router = express.Router();

router.get('/', validateQuery(paginationQuerySchema.merge(letterFilterQuerySchema)), async(req, res) => {
    return res.json(await artists.get(req.validatedQuery.page, req.validatedQuery.limit, req.validatedQuery.filter));
});

router.get('/:artistId', validateParams(artistIdParamSchema), validateQuery(paginationQuerySchema), async (req, res) => {
    const artistId = req.validatedParams.artistId;
    const artist = await artistDetails.getById(artistId);

    if(artist.data.length === 0) {
        return res.status(404).json({ error: [
            { message: 'Artist not found' }
        ]});
    }

    const [tracks, topSharers] = await Promise.all([
        artistDetails.getTracks(artistId, req.validatedQuery.page, req.validatedQuery.limit),
        artistDetails.getTopSharers(artistId)
    ]);

    return res.json({
        artist: artist.data[0],
        tracks,
        topSharers,
    });
});

export default router;
