const express = require('express');
const router = express.Router();
const artistDetails = require('../services/artistDetails');

const WEB_PER_PAGE = 50;

router.get('/:artistId', async function(req, res, next) {
    try {
        const artistId = parseInt(req.params.artistId, 10);
        if (isNaN(artistId)) {
            res.status(400).send('Invalid artist ID');
            return;
        }

        const artist = await artistDetails.getById(artistId);
        if (artist.data.length === 0) {
            res.status(404).send('Artist not found');
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const [tracks, topSharers] = await Promise.all([
            artistDetails.getTracks(artistId, page, WEB_PER_PAGE),
            artistDetails.getTopSharers(artistId)
        ]);

        return res.render('artist', {
            artist: artist.data[0],
            tracks,
            topSharers
        });
    } catch (err) {
        console.error('Error getting artist details', err.message);
        next(err);
    }
});

module.exports = router;
