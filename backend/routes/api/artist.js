const express = require('express');
const router = express.Router();
const artistDetails = require('../../services/artistDetails');
const { validateQuery, validateParams } = require('../../middleware/validate');
const { artistIdParamSchema, paginationQuerySchema } = require('../../schema');

router.get('/:artistId', validateParams(artistIdParamSchema), validateQuery(paginationQuerySchema), async (req, res, next) => {
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

module.exports = router;
